import { useEffect, useState } from "react"
import { ChangeEvent } from "react"

export const useHttpGet = <T>(url: string): [boolean, T | null] => {
    const [loading, setLoading] = useState(true)
    const [result, setResult] = useState<T | null>(null)

    useEffect(() => {
        fetch(url)
            .then(res => res.json() as Promise<T>)
            .then(data => setResult(data))
            .finally(() => setLoading(false))
    }, [url])

    return [loading, result]
}

export interface FormErrors {
    [key: string]: string
}

export interface FormValues {
    [key: string]: string
}

export interface FormRules {
    [key: string]: {
        required: string
    }
}

export const useForm = () => {
    const [values, setValues] = useState<FormValues>({})
    const [errors, setErrors] = useState<FormErrors>({})
    const rules: FormRules = {}

    const handleSubmit = (callback: (values: FormValues) => void) => (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        let temp = { ...errors }
        for (let key in rules) {
            if (rules[key].required && (!values[key] || !values[key].trim())) {
                temp[key] = rules[key].required
            } else {
                delete temp[key]
            }
        }

        setErrors(temp)

        if (Object.keys(temp).length === 0) {
            callback(values)
        }
    }

    const register = (key: string, options: { required: string } = { required: '' }): {
        value: string
        onChange: (e: ChangeEvent<HTMLInputElement>) => void
    } => {
        rules[key] = options
        return {
            value: values[key] || '',
            onChange: (e: ChangeEvent<HTMLInputElement>) => setValues({ ...values, [key]: e.target.value })
        }
    }

    const reset = () => {setValues({})}

    return { handleSubmit, register, errors, reset }
}

