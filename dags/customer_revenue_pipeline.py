from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.bash import BashOperator

default_args = {
    'owner': 'data-platform',
    'depends_on_past': False,
    'start_date': datetime(2023, 1, 1),
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

    run_dbt_staging = BashOperator(
        task_id='dbt_run_staging',
        bash_command='dbt run --select stg_customer_transactions',
    )

    run_dbt_analytics = BashOperator(
        task_id='dbt_run_analytics',
        bash_command='dbt run --select customer_revenue',
    )

    test_dbt = BashOperator(
        task_id='dbt_test',
        bash_command='dbt test',
    )

    run_dbt_staging >> run_dbt_analytics >> test_dbt