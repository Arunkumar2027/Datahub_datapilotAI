{{ config(
    materialized='incremental',
    unique_key='revenue_id'
) }}

with staged as (
    select * from {{ ref('stg_customer_transactions') }}
    {% if is_incremental() %}
    where cast(transaction_date as date) >= (select max(revenue_date) from {{ this }})
    {% endif %}
),

daily_aggregation as (
    select
        cast(transaction_date as date) as revenue_date,
        customer_id,
        currency,
        sum(amount) as daily_revenue,
        count(transaction_id) as transaction_count
    from staged
    group by 1, 2, 3
)

select
    md5(concat(cast(revenue_date as varchar), '-', customer_id, '-', currency)) as revenue_id,
    revenue_date,
    customer_id,
    currency,
    daily_revenue,
    transaction_count
from daily_aggregation