create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

create type user_tier as enum ('basic', 'standard', 'premium', 'vip');
create type employment_status as enum ('employed', 'self-employed', 'student', 'retired', 'unemployed', 'other');
create type income_range as enum ('under_10k', '10k_25k', '25k_50k', '50k_100k', '100k_250k', 'over_250k');
create type investment_experience as enum ('none', 'beginner', 'intermediate', 'experienced', 'professional');
create type kyc_status as enum ('pending', 'submitted', 'approved', 'rejected', 'expired');
create type kyc_doc_type as enum ('passport', 'national_id', 'drivers_licence', 'proof_of_address');
create type asset_type as enum ('stock', 'etf', 'crypto', 'forex', 'commodity', 'index');
create type order_type as enum ('market', 'limit', 'stop', 'stop_limit', 'trailing_stop');
create type order_side as enum ('buy', 'sell');
create type order_status as enum ('pending', 'accepted', 'pending_new', 'new', 'partially_filled', 'filled', 'canceled', 'expired', 'replaced', 'rejected', 'held');
create type time_in_force as enum ('day', 'gtc', 'opg', 'cls', 'ioc', 'fok');
create type transaction_type as enum ('trade', 'dividend', 'fee', 'interest', 'adjustment', 'deposit', 'withdrawal', 'conversion');
create type deposit_withdrawal_type as enum ('deposit', 'withdrawal');
create type deposit_withdrawal_status as enum ('pending', 'processing', 'completed', 'failed', 'canceled');
create type payment_method as enum ('bank_transfer', 'card', 'crypto_wallet', 'internal');
create type notification_type as enum ('price_alert', 'order_filled', 'order_canceled', 'deposit_confirmed', 'withdrawal_processed', 'kyc_update', 'system');
create type notification_channel as enum ('in_app', 'sms', 'email', 'push');
create type price_alert_condition as enum ('above', 'below', 'percent_change_up', 'percent_change_down');
create type price_data_source as enum ('alpaca', 'finnhub', 'manual');
create type price_interval as enum ('1min', '5min', '15min', '30min', '1hour', '1day', '1week', '1month');

drop table if exists Countries cascade;
create table if not exists Countries
(
    code            char(2) primary key,
    name            varchar(100) not null,
    flag_url        varchar(100),
    region          varchar(100),
    phone_prefix    varchar(10),
    trading_allowed boolean      not null default true,
    created_at      timestamptz  not null default now()
);

drop table if exists Currencies cascade;
create table if not exists Currencies
(
    code       char(10) primary key,
    name       varchar(100) not null,
    symbol     varchar(10)  not null,
    is_fiat    boolean      not null default true,
    is_crypto  boolean      not null default false,
    decimals   smallint     not null default 2, -- 2 for fiat, 8 for crypto
    is_active  boolean      not null default true,
    created_at timestamptz  not null default now()
);

drop table if exists FX_Rates cascade;
create table if not exists FX_Rates
(
    id             uuid primary key           default uuid_generate_v4(),
    base_currency  char(10)          not null references Currencies (code),
    quote_currency char(10)          not null references Currencies (code),
    rate           numeric(24, 8)    not null,
    bid            numeric(24, 8),
    ask            numeric(24, 8),
    source         price_data_source not null default 'finnhub',
    fetched_at     timestamptz       not null default now(),

    constraint fk_fx_base_ne_quote check (base_currency <> quote_currency)
);

create index idx_fx_rates_pair on FX_Rates (base_currency, quote_currency, fetched_at desc);

drop table if exists Users cascade;
create table Users
(
    id                    uuid primary key        default uuid_generate_v4(),
    email                 varchar(255)   not null unique,
    username              varchar(50)    not null unique,
    password_hash         text           not null,
    first_name            varchar(100),
    last_name             varchar(100),
    date_of_birth         date,
    phone                 varchar(20),
    country_code          char(2) references Countries (code),
    currency_code         char(10)       not null default 'USD' references Currencies (code),
    tier                  user_tier      not null default 'basic',

    kyc_verified          boolean        not null default false,
    kyc_verified_at       timestamptz,

    two_fa_enabled        boolean        not null default false,
    two_fa_secret         text,

    cash_balance          numeric(18, 2) not null default 0.00,
    buying_power          numeric(18, 2) not null default 0.00,
    reserved_balance      numeric(18, 2) not null default 0.00, -- locked in pending orders

    alpaca_account_id     varchar(100) unique,
    alpaca_account_number varchar(20) unique,

    is_active             boolean        not null default true,
    created_at            timestamptz             default now(),
    updated_at            timestamptz             default now(),
    last_login_at         timestamptz,

    constraint chk_cash_non_negative check (cash_balance >= 0),
    constraint chk_buying_power_non_negative check (buying_power >= 0)
);

alter table users add column employment_status employment_status;
alter table users add column income_range income_range;
alter table users add column investment_experience investment_experience not null default 'none';
alter table users add constraint uq_phone unique (phone);
alter table users add column picture_url varchar(500);
alter table users add column is_admin boolean not null default false;

create index idx_users_email on Users (email);
create index idx_users_country on Users (country_code);

drop table if exists KYC_Documents cascade;
create table if not exists KYC_Documents
(
    id               uuid primary key      default uuid_generate_v4(),
    user_id          uuid         not null references Users (id) on delete cascade,
    doc_type         kyc_doc_type not null,
    doc_number       varchar(100),
    country_code     char(2) references Countries (code),
    status           kyc_status   not null default 'pending',
    expiry_date      date,
    rejection_reason text,
    submitted_at     timestamptz  not null default now(),
    reviewed_at      timestamptz,
    reviewed_by      uuid references Users (id) -- admin user
);

create index idx_kyc_user on KYC_Documents (user_id, status);

drop table if exists Assets cascade;
create table if not exists Assets
(
    id              uuid primary key        default uuid_generate_v4(),
    symbol          varchar(20)    not null unique,
    name            varchar(200)   not null,
    asset_type      asset_type     not null,
    exchange        varchar(50),  -- NYSE, NASDAQ, BINANCE...
    country_code    char(2) references Countries (code),
    currency_code   char(10)       not null references Currencies (code),
    sector          varchar(100), -- Technology, Healthcare...
    industry        varchar(100),
    market_cap      numeric(24, 2),
    isin            char(12),     -- Internation Securities ID
    cusip           char(9),
    figi            varchar(12),  -- Financial Instrument Global ID

    is_active       boolean        not null default true,
    is_tradeable    boolean        not null default true,
    is_fractionable boolean        not null default false,
    min_order_size  numeric(18, 8) not null default 1,
    max_order_size  numeric(18, 8),

    alpaca_asset_id varchar(100) unique,
    finnhub_symbol  varchar(30),
    finnhub_mic     varchar(10),  -- Market Identifier Code (XNAS, XNYS...)
    coingecko_id    varchar(100), -- for crypto

    created_at      timestamptz    not null default now(),
    updated_at      timestamptz    not null default now()
);

create index idx_assets_type on Assets (asset_type, is_active);
create index idx_assets_exchange on Assets (exchange);
create index idx_assets_finnhub on Assets (finnhub_symbol);

drop table if exists Asset_Prices cascade;
create table if not exists Asset_Prices
(
    id          uuid                       default uuid_generate_v4(),
    asset_id    uuid              not null references Assets (id),
    interval    price_interval    not null,
    open        numeric(24, 8)    not null,
    high        numeric(24, 8)    not null,
    low         numeric(24, 8)    not null,
    close       numeric(24, 8)    not null,
    volume      numeric(24, 8),
    vwap        numeric(24, 8), -- Volume Weighted Average Price
    trade_count integer,
    source      price_data_source not null,
    price_time  timestamptz       not null,
    created_at  timestamptz       not null default now(),

    primary key (asset_id, interval, price_time)
) partition by range (price_time);

-- Partitions, add more if needed
create table Asset_Prices_2024 partition of Asset_Prices for values from ('2024-01-01') to ('2025-01-01');
create table Asset_Prices_2025 partition of Asset_Prices for values from ('2025-01-01') to ('2026-01-01');
create table Asset_Prices_2026 partition of Asset_Prices for values from ('2026-01-01') to ('2027-01-01');

create index idx_asset_prices_lookup on Asset_Prices (asset_id, interval, price_time desc);

drop table if exists Asset_Quotes cascade;
create table if not exists Asset_Quotes
(
    asset_id     uuid primary key references Assets (id),
    bid          numeric(24, 8),
    ask          numeric(24, 8),
    last_price   numeric(24, 8),
    prev_close   numeric(24, 8),
    change_pct   numeric(8, 4),
    volume_today numeric(24, 4),
    market_cap   numeric(24, 2),
    pe_ratio     numeric(10, 4),
    week_52_high numeric(24, 8),
    week_52_low  numeric(24, 8),
    source       price_data_source not null,
    updated_at   timestamptz       not null default now()
);

drop table if exists Portfolios cascade;
create table if not exists Portfolios
(
    id                uuid primary key      default uuid_generate_v4(),
    user_id           uuid         not null references Users (id) on delete cascade,
    name              varchar(100) not null,
    is_paper          boolean      not null default false, -- paper trading
    description       text,
    alpaca_account_id varchar(100),
    created_at        timestamptz  not null default now(),
    updated_at        timestamptz  not null default now(),

    constraint uq_portfolio_user_name unique (user_id, name)
);

create index idx_portfolio_user on Portfolios (user_id);

drop table if exists Holdings cascade;
create table if not exists Holdings
(
    id             uuid primary key        default uuid_generate_v4(),
    portfolio_id   uuid           not null references Portfolios (id) on delete cascade,
    asset_id       uuid           not null references Assets (id),
    quantity       numeric(18, 8) not null default 0,
    avg_cost_basis numeric(24, 8) not null default 0,
    total_cost     numeric(18, 2) not null default 0,
    realized_pnl   numeric(18, 2) not null default 0,
    last_updated   timestamptz    not null default now(),

    constraint uq_holding unique (portfolio_id, asset_id),
    constraint chk_quantity_non_negative check (quantity >= 0)
);

create index idx_holdings_portfolio on Holdings (portfolio_id);
create index idx_holdings_asset on Holdings (asset_id);

drop table if exists Orders cascade;
create table if not exists Orders
(
    id                     uuid primary key        default uuid_generate_v4(),
    user_id                uuid           not null references Users (id),
    portfolio_id           uuid           not null references Portfolios (id),
    asset_id               uuid           not null references Assets (id),

    order_type             order_type     not null,
    side                   order_side     not null,
    status                 order_status   not null default 'pending',
    time_in_force          time_in_force  not null default 'day',

    quantity               numeric(18, 8) not null,
    filled_qty             numeric(18, 8) not null default 0,
    notional               numeric(18, 2), -- value in dollars (for fractional)

    limit_price            numeric(24, 8),
    stop_price             numeric(24, 8),
    trail_price            numeric(24, 8),
    trail_percent          numeric(8, 4),
    avg_fill_price         numeric(24, 8),

    commission             numeric(10, 4) not null default 0,

    alpaca_order_id        varchar(100) unique,
    alpaca_client_order_id varchar(100) unique,

    reject_notes           text,
    notes                  text,

    submitted_at           timestamptz    not null default now(),
    accepted_at            timestamptz,
    filled_at              timestamptz,
    canceled_at            timestamptz,
    expired_at             timestamptz,
    updated_at             timestamptz    not null default now(),

    constraint chk_limit_price_for_limit check (order_type not in ('limit', 'stop_limit') or limit_price is not null),
    constraint chk_stop_price_for_stop check (order_type not in ('stop', 'stop_limit') or stop_price is not null),
    constraint chk_filled_qty check (filled_qty <= quantity)
);

create index idx_orders_user on Orders (user_id, status);
create index idx_orders_portfolio on Orders (portfolio_id);
create index idx_orders_asset on Orders (asset_id);
create index idx_orders_alpaca on Orders (alpaca_order_id);
create index idx_orders_submitted on Orders (submitted_at desc);

drop table if exists Transactions cascade;
create table if not exists Transactions
(
    id               uuid primary key          default uuid_generate_v4(),
    user_id          uuid             not null references Users (id),
    order_id         uuid references Orders (id),
    asset_id         uuid references Assets (id),

    transaction_type transaction_type not null,
    side             order_side,
    quantity         numeric(18, 8),
    price            numeric(24, 8),
    total_value      numeric(18, 2)   not null,
    fee              numeric(10, 4)   not null default 0,
    net_value        numeric(18, 2)   not null, -- total_value - fee
    currency_code    char(10)         not null references Currencies (code),

    description      text,

    executed_at      timestamptz      not null default now()
);

create index idx_transactions_user on Transactions (user_id, executed_at desc);
create index idx_transactions_order on Transactions (order_id);
create index idx_transactions_asset on Transactions (asset_id);

drop table if exists Deposits_Withdrawals cascade;
create table if not exists Deposits_Withdrawals
(
    id             uuid primary key                   default uuid_generate_v4(),
    user_id        uuid                      not null references Users (id),
    type           deposit_withdrawal_type   not null,
    amount         numeric(18, 2)            not null,
    currency_code  char(10)                  not null references Currencies (code),
    status         deposit_withdrawal_status not null default 'pending',
    payment_method payment_method            not null,
    reference      varchar(200),               -- IBAN, card last 4, wallet address
    external_tx_id varchar(200),
    fee            numeric(10, 4)            not null default 0,
    notes          text,
    requested_at   timestamptz               not null default now(),
    processed_at   timestamptz,
    processed_by   uuid references Users (id), -- admin user

    constraint chk_amount_positive check (amount > 0)
);

create index idx_deposits_user on Deposits_Withdrawals (user_id, requested_at desc);
create index idx_deposits_status on Deposits_Withdrawals (status);

drop table if exists Watchlists cascade;
create table if not exists Watchlists
(
    id         uuid primary key      default uuid_generate_v4(),
    user_id    uuid         not null references Users (id) on delete cascade,
    name       varchar(100) not null,
    created_at timestamptz  not null default now(),

    constraint uq_watchlist_user_name unique (user_id, name)
);

drop table if exists Watchlist_Items cascade;
create table if not exists Watchlist_Items
(
    id           uuid primary key     default uuid_generate_v4(),
    watchlist_id uuid        not null references Watchlists (id) on delete cascade,
    asset_id     uuid        not null references Assets (id),
    added_at     timestamptz not null default now(),

    constraint uq_watchlist_item unique (watchlist_id, asset_id)
);

create index idx_watchlist_items_list on Watchlist_Items (watchlist_id);

drop table if exists Price_Alerts cascade;
create table if not exists Price_Alerts
(
    id             uuid primary key               default uuid_generate_v4(),
    user_id        uuid                  not null references Users (id) on delete cascade,
    asset_id       uuid                  not null references Assets (id),
    condition      price_alert_condition not null,
    target_price   numeric(24, 8)        not null,
    target_percent numeric(8, 4),                                -- for percent_change
    is_recurring   boolean               not null default false, -- re-trigger after reset
    triggered      boolean               not null default false,
    is_active      boolean               not null default true,
    created_at     timestamptz           not null default now(),
    triggered_at   timestamptz
);

create index idx_price_alerts_user on Price_Alerts (user_id);
create index idx_price_alerts_asset on Price_Alerts (asset_id, is_active, triggered);

drop table if exists Notifications cascade;
create table if not exists Notifications
(
    id         uuid primary key              default uuid_generate_v4(),
    user_id    uuid                 not null references Users (id) on delete cascade,
    type       notification_type    not null,
    channel    notification_channel not null,
    title      varchar(200)         not null,
    message    text                 not null,
    metadata   jsonb, -- extra data (order_id, asset_id etc)
    is_read    boolean              not null default false,
    created_at timestamptz          not null default now(),
    read_at    timestamptz
);

create index idx_notifications_user on Notifications (user_id, is_read, created_at desc);

drop table if exists Audit_Log cascade;
create table if not exists Audit_Log
(
    id          uuid primary key      default uuid_generate_v4(),
    user_id     uuid references Users (id),
    action      varchar(100) not null, -- 'login', 'order_placed', 'withdrawal requested'...
    entity_type varchar(50),           -- 'order', 'user', 'portfolio'...
    entity_id   uuid,
    old_values  jsonb,
    new_values  jsonb,
    ip_address  inet,
    user_agent  text,
    created_at  timestamptz  not null default now()
);

create index idx_audit_user on Audit_Log (user_id, created_at desc);
create index idx_audit_entity on Audit_Log (entity_type, entity_id);

create or replace function update_updated_at()
    returns trigger as
$$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger trg_users_updated_at
    before update
    on Users
    for each row
execute function update_updated_at();

create trigger trg_assets_updated_at
    before update
    on Assets
    for each row
execute function update_updated_at();

create trigger trg_portfolios_updated_at
    before update
    on Portfolios
    for each row
execute function update_updated_at();

create trigger trg_orders_updated_at
    before update
    on Orders
    for each row
execute function update_updated_at();