import { Container, Row, Col, Form, FloatingLabel, FormGroup } from "react-bootstrap";
import "./index.css";
import { Divider, Title } from "../../../../components/common/heading/heading.component";
import { ButtonComponent } from "../../../../components/common/button/button.component";
import { NavLink } from "react-router-dom";
import {useForm} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup"

const RegisterPage = () => {

    const registerSchema = Yup.object({
        name: Yup.string().min(2).max(50).required(),
        email: Yup.string().email().required()
    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(registerSchema)
    });

    const submitHandler = (data)=>{
        console.log(data);
    }
    console.log(errors);
    return (<>
        <Container className="register-wrapper my-5" sm={12} md={{ offset: 3, span: 6 }}>
            <Row>
                <Col sm={12} md={{ offset: 4, span: 4 }}>
                    <Title>Create your account</Title>
                    <Divider></Divider>
                </Col>
            </Row>
            <Row>
                <Col sm={12} md={{ offset: 4, span: 4 }}>
                    <Form onSubmit={handleSubmit(submitHandler)}> 
                        <FormGroup>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Full Name"
                                className="mb-3"
                            >
                                <Form.Control type="text" size="sm" {...register("name", {required: true})} placeholder="Full Name" />
                                <span className="text-danger"><em>{errors?.name?.message}</em></span>
                            </FloatingLabel>
                        </FormGroup>
                        <FormGroup>
                            <FloatingLabel controlId="floatingPassword" label="Email" className="mb-3">
                                <Form.Control type="email" size="sm" {...register("email", {required: true})} placeholder="Your email" />
                                <span className="text-danger"><em>{errors?.email?.message}</em></span>
                            </FloatingLabel>
                        </FormGroup>
                        <FormGroup className="row mt-3">
                            <Col className="mb-3 text-center">
                                <ButtonComponent label="Sign Up" type="submit"/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                        <Col className="text-center">
                            Or <NavLink to="/login">Have account?</NavLink>
                        </Col>
                    </FormGroup>
                    </Form>
                </Col>
            </Row>
        </Container>
    </>)
}

export default RegisterPage;