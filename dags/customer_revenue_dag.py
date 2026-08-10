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
    description='Daily customer revenue transformation pipeline',
    schedule_interval='@daily',
    catchup=False,
) as dag:

    dbt_run_staging = BashOperator(
        task_id='dbt_run_staging',
        bash_command='dbt run --select stg_customer_transactions',
    )

    dbt_run_marts = BashOperator(
        task_id='dbt_run_marts',
        bash_command='dbt run --select customer_revenue',
    )

    dbt_test = BashOperator(
        task_id='dbt_test',
        bash_command='dbt test',
    )

    dbt_run_staging >> dbt_run_marts >> dbt_test