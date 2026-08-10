-- Financial validation: Daily revenue should always be non-negative
select
    transaction_date,
    hashed_customer_id,
    daily_revenue
from {{ ref('customer_revenue') }}
where daily_revenue < 0