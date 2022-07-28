import { Fragment, useState, useEffect, useContext, createContext } from "react";
import Link from "next/link";
import Image from "next/image";
import PropTypes from "prop-types";
import { toast } from "react-hot-toast";
import { Dialog, Transition } from "@headlessui/react";
import { Formik, Form } from "formik";
import Input from "@/components/Input";
//import login from "../pages/api/login"
import {
  SparklesIcon,
  MailOpenIcon,
  XIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { signIn } from "next-auth/react";


const SigninPopupModal = ({ show = false, onClose = () => null, buttonText="Iniciar sesión", initialValues = null, onSubmit = () => null, redirectPath = ""}) => {
  const [disabled, setDisabled] = useState(false);
  const [showConfirm, setConfirm] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const closeModal = () => {
    if (typeof onClose === "function") {
      onClose();
    }
  };

  // Reset modal
  useEffect(() => {
    if (!show) {
      setTimeout(() => {
        setDisabled(false);
        setConfirm(false);
        setShowSignIn(false);
      }, 200);
    }
  }, [show]);

  useEffect(() => {
    toast.dismiss();
  }, []);
  
  const handleOnSubmit = async (values = null) => {
    let toastId;

    try {
      setDisabled(true);
      toastId = toast.loading("Ingresando...");
      if (typeof onSubmit === "function") {
        await onSubmit({...values})
        //if (values.email === process.env.EMAIL_ADMIN  && values.password === process.env.PASSWORD_ADMIN){ 
        //if (values.email === "ola"  && values.password === "ola") {
            console.log(`${values.emai} ${values.password}`)
            signIn()
            setShowSignIn(true)
            setSubmitted(true)
          if (redirectPath) {
            router.push(redirectPath);
          }
          toast.success("Ingresado con éxito", { id: toastId });
        /*} else {
          toast.error("No se ha podido ingresar", { id: toastId });
          setDisabled(false);
        }*/
      }
    } catch (e) {
      toast.error("No se ha podido ingresar", { id: toastId });
      setDisabled(false);
    }
  };
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={closeModal}
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-75" />

        <div className="min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative inline-block w-full max-w-xl my-8 overflow-hidden text-left transition-all transform shadow-2xl bg-neutral sm:rounded-xl">
              <button
                onClick={closeModal}
                className="absolute p-1 transition rounded-md top-2 right-2 shrink-0 hover:bg-gray-100 focus:outline-none"
              >
                <XIcon className="w-5 h-5" />
              </button>

              <div className="py-12">
                <div className="px-4 sm:px-12">
                  <div className="flex justify-center">
                    <a className="flex items-center space-x-1">
                      <span className="text-2xl font-semibold tracking-wide text-white">
                      <span className="text-3xl text-success">M</span>i
                      <span className="text-3xl text-success">M</span>undo
                      <span className="text-3xl text-success">C</span>reativo
                      </span>
                    </a>
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="mt-6 text-lg font-bold text-center sm:text-2xl text-secondary"
                  >
                    {showSignIn ? "¡Hola nuevamente!" : "Acceder"}
                  </Dialog.Title>
                  {!showSignIn ? (
                    <Dialog.Description className="mt-2 text-base text-center text-gray-500">
                      <Formik
                        initialValues={{
                          email: '',
                          password: '',
                        }}
                        validateOnBlur={false}
                        onSubmit={handleOnSubmit}>
                          {({ isSubmitting, isValid }) => (
                           <Form className="space-y-6 text-left">
                           <div className="space-y-6">
                            <Input
                              name="email"
                              type="text"
                              label="Usuario"
                              placeholder="Correo electónico."
                              disabled={disabled}
                            />
                            <Input
                              name="password"
                              type="password"
                              label="Contraseña"
                              placeholder="Contraseña."
                              disabled={disabled}
                            />
                           </div>
                           <div className="flex justify-center">
                            <button
                              type="submit"
                              disabled={disabled || !isValid}
                              className="btn btn-info"
                              >
                              {isSubmitting ? "Accediendo..." : buttonText}
                            </button>
                          </div>
                          </Form>
                          )}
                         </Formik>
                    </Dialog.Description>
                  ) : null}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

SigninPopupModal.propTypes = {
  initialValues: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  show: PropTypes.bool,
  onClose: PropTypes.func,
  redirectPath: PropTypes.string,
  buttonText: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default SigninPopupModal;
