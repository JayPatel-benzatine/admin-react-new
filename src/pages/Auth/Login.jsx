import React, { useEffect } from 'react'
import { InputBox, Loader } from '../../components'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction } from '../../store/action/AuthRedux'


function Login() {
    const { control, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const authData = useSelector((state) => state.auth)
    const { loading, user } = authData
    const onSubmit = (data) => {
        dispatch(loginAction(data))
    }

    useEffect(() => {
        if (user && user?.token) {
            navigate("/")
        }
        return () => { }
    }, [user])


    return (
        <div>
            {loading && <Loader />}
            <section className="section" style={{ height: "100vh" }}>
                <div className="container pt-5">
                    <div className="row">
                        <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h4>Login</h4>
                                </div>
                                <div className="card-body">
                                    <form className="needs-validation" onSubmit={handleSubmit(onSubmit)}>
                                        <InputBox
                                            control={control}
                                            label={"email"}
                                            type={'email'}
                                            name={'email'}
                                            rules={{ required: true }}
                                            className={errors?.email ? 'error' : ''}
                                        />
                                        <InputBox
                                            control={control}
                                            label={"Password"}
                                            type={'password'}
                                            name={'password'}
                                            rules={{ required: true }}
                                            className={errors?.password ? 'error' : ''}
                                        />
                                        <div className="form-group">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" name="remember" className="custom-control-input" tabIndex="3" id="remember-me" />
                                                <label className="custom-control-label" htmlFor="remember-me">Remember Me</label>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary btn-lg btn-block w-100" tabIndex="4">
                                                Login
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login