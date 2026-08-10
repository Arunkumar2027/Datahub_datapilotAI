from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.bash import BashOperator

default_args = {
    'owner': 'data-platform',
    'depends_on_past': False,
    'start_date': datetime(2023, 1, 1),
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

with DAG(
    'customer_revenue_pipeline',
    default_args=default_args,
    description='Daily customer revenue aggregation pipeline',
    schedule_interval='@daily',
    catchup=False,
) as dag:

    run_stg_transactions = BashOperator(
        task_id='run_stg_transactions',
        bash_command='dbt run --select stg_customer_transactions',
    )

    run_customer_revenue = BashOperator(
        task_id='run_customer_revenue',
        bash_command='dbt run --select customer_revenue',
    )

    test_customer_revenue = BashOperator(
        task_id='test_customer_revenue',
        bash_command='dbt test --select customer_revenue',
    )

    run_stg_transactions >> run_customer_revenue >> test_customer_revenue