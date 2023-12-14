import LoginForm from "../login/LoginForm";


const RegisterCard = () => {

    return(
        <div className="flex justify-center items-center h-screen bg-gray-700">
            <div className="card w-fit bg-base-100 shadow-xl">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Cette action nécessite d'être connecté !</h2>
                    <LoginForm />

                </div>
            </div>
        </div>
    )

};

export default RegisterCard;