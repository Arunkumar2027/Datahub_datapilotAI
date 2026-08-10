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

    run_stg_model = BashOperator(
        task_id='run_stg_customer_transactions',
        bash_command='dbt run --select stg_customer_transactions',
    )

    run_analytics_model = BashOperator(
        task_id='run_customer_revenue',
        bash_command='dbt run --select customer_revenue',
    )

    test_models = BashOperator(
        task_id='test_dbt_models',
        bash_command='dbt test',
    )

    run_stg_model >> run_analytics_model >> test_models