import { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { Button, Checkbox, Form, Message, Schema, InputGroup } from "rsuite";
import storageHelper from "app/helpers/storage.helper"
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';

const model = Schema.Model({
    name: Schema.Types.StringType().isRequired('Name is required'),
    password: Schema.Types.StringType().isRequired('Password is required'),
})

const Login = () => {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')

    const formRef = useRef()
    const [formValue, setFormValue] = useState({
        name: '',
        password: ''
    })

    const [visible, setVisible] = useState(false)

    const handleChange = () => {
        setVisible(!visible);
    }

    const hanleSubmit = async () => {
        const isFormValid = formRef.current.check()
        if(isFormValid) {
            setErrorMessage('')
    
            storageHelper.saveItem('user', {
                ...formValue
            })

            navigate('/')
        }

    }
    return (
        <div className="flex justify-center items-center h-[100dvh]">
            <div className="login-form w-[300px]">
                <img alt="stories" src="/img/brand.png" width="150" className="mb-6"/>
                <h3>Welcome</h3>
                <div className="mb-9 text-[16px]">Please fill your detail to access your account.</div>
                <Form
                    ref={formRef}
                    model={model}
                    formValue={formValue}
                    onChange={setFormValue}
                    onSubmit={hanleSubmit}
                    checkTrigger="none"
                    fluid
                >
                    <Form.Group>
                        <Form.ControlLabel className="text-[#000]">Name</Form.ControlLabel>
                        <Form.Control name="name" placeholder="Enter name" />
                    </Form.Group>
                    <Form.Group>
                        <Form.ControlLabel className="text-[#000]">Password</Form.ControlLabel>
                        <InputGroup>
                            <Form.Control name="password" type={visible ? 'text' : 'password'} placeholder="Enter password" />
                            <InputGroup.Button onClick={handleChange}>
                                {visible ? <EyeIcon /> : <EyeSlashIcon />}
                            </InputGroup.Button>
                        </InputGroup>
                    </Form.Group>
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                        <Checkbox 
                            value={true} 
                            className="[&>div>label]:!font-medium [&>div>label]:text-[#343a40] ml-[-8px]"
                        >Remember me</Checkbox>
                        <div className="font-medium sm:text-center mt-6 md:mt-0 text-[#1a5999]">Forget Password?</div>
                    </div>
                    {errorMessage !== '' && (
                        <Message 
                            showIcon 
                            type="warning"
                            className="text-xs bg-[#f8d7da] text-[#58151c] [&>div]:p-4 mb-8" 
                        >
                            {errorMessage}
                        </Message>
                    )}
                    <Button className="font-semibold" appearance="primary" block type="submit">Login</Button>
                </Form>
            </div>
        </div>
    );
};

export default Login;