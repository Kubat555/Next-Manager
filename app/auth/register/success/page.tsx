import { CheckCircleIcon} from '@heroicons/react/24/outline';

const RegistrationSuccessPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className=" p-8 text-center">
                <CheckCircleIcon className="w-16 h-16 text-blue-500 mx-auto" />
                <h1 className="text-2xl font-bold mt-4">Registration Successful!</h1>
                <p className="text-gray-600 mt-2">
                    You have successfully registered. Please check your email and <span className="font-bold ">confirm your email address</span> to complete the registration process.
                </p>
                <br/>
                <span className="text-red-500 font-bold">
                    You won't be able to log in until you confirm your email !
                </span>
            </div>
        </div>
    );
};

export default RegistrationSuccessPage;
