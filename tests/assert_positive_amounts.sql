select
    transaction_id,
    amount
from {{ ref('stg_customer_transactions') }}
where amount < 0