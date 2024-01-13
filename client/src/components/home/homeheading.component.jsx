import {Form} from "react-bootstrap"

const HomeHeading = () => {
    return (<>
        <header className="p-3 text-bg-dark">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        <h3><i className="fa-solid fa-ticket"></i> &nbsp;Tea Cut</h3> &nbsp; &nbsp; &nbsp;
                    </a>



                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><a href="#" className="nav-link px-2 text-secondary">Now Showing</a></li>
                        <li><a href="#" className="nav-link px-2 text-white">Coming Soon</a></li>
                        {/* <li><a href="#" className="nav-link px-2 text-white">Your Tickets</a></li> */}
                        <li><a href="#" className="nav-link px-2 text-white">Contact Us</a></li>
                    </ul>

                    <Form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                        <Form.Control type="search" className="form-control-dark form-control-sm text-bg-dark" placeholder="Search..." aria-label="Search"/>
                    </Form>

                    <div className="text-end">
                        <button type="button" className="btn btn-sm btn-outline-light me-2">Login</button>
                        <button type="button" className="btn btn-sm btn-warning me-3">Sign-up</button>
                        <button className="btn btn-sm btn-outline-light"><i className="fa-solid fa-circle-half-stroke"></i></button>
                    </div>
                </div>
            </div>
        </header>
    </>)
}

export default HomeHeading