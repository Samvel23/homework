import { useForm } from '../../hooks'
import styles from './style.module.css'
export const Parent = () => {

    const { handleSubmit, register, errors, reset } = useForm()
    const handleAdd = data => {
        console.log(data)
    }
    return <>
        <h1 className={styles.title}>Parent</h1>

        <form onSubmit={handleSubmit(handleAdd)}>
            <div>
                {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                <input
                    {...register('name', { required: 'please fill name' })}
                    
                />
            </div>

            <div>
                {errors.age && <p style={{ color: 'red' }}>{errors.age}</p>}

                <input
                    {...register("age", { required: 'lracra surname-d' })}
                />
            </div>
            <button onClick={reset}>save</button>
        </form>
    </>
}