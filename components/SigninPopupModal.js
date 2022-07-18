import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import PropTypes from "prop-types";
import { toast } from "react-hot-toast";
import { Dialog, Transition } from "@headlessui/react";
import { Formik, Form } from "formik";
import Input from "@/components/Input";
import {
  SparklesIcon,
  MailOpenIcon,
  XIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { createClient } from "@supabase/supabase-js";
/*
const supabase = createClient(
  process.env.SUPABASE_API_URL,
  process.env.SUPABASE_API_KEY
);*/

const Confirm = ({ show = false, email = "", }) => (
  <Transition appear show={show} as={Fragment}>
    <div className="fixed inset-0 z-50">
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-white" />
      </Transition.Child>

      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="flex items-center justify-center h-full p-8">
          <div className="overflow-hidden transition-all transform">
            <h3 className="text-lg font-medium leading-6 text-center">
              <div className="flex flex-col items-center justify-center space-y-4">
                <MailOpenIcon className="w-12 h-12 text-teal-500 shrink-0" />
              </div>
              <p className="mt-2 text-2xl font-semibold">Confirm your email</p>
            </h3>

            <p className="mt-4 text-lg text-center">
              We have sed and email to <strong>{email ?? ""}</strong>.
              <br />
              Check your email and click on that confirmation link.
            </p>
          </div>
        </div>
      </Transition.Child>
    </div>
  </Transition>
);

const SigninPopupModal = ({ show = false, onClose = () => null, buttonText="Iniciar sesión", initialValues = null, onSubmit = () => null, redirectPath = "",}) => {
  const [disabled, setDisabled] = useState(false);
  const [showConfirm, setConfirm] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const [emailAdmin, setEmail] = useState(initialValues?.email ?? "");
  const [passwordAdmin, setPassword] = useState(initialValues?.password ?? "");
  const { cuenta, ...initialFormValues } = initialValues ?? {
    email: "",
    password: "",
  };

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
      const { user, error } = await supabase.auth.signIn({
        email: values.email,
        password: values.password,
      })
      if (typeof onSubmit === "function") {
        await onSubmit({...values})
      }
      toast.success("Ingresado con éxito", { id: toastId });
      if (redirectPath) {
        router.push(redirectPath);
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
                    {showSignIn ? "Welcome back!" : "Acceder"}
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
                              className="px-6 py-2 text-white transition rounded-md bg-success focus:outline-none focus:ring-4 focus:ring-teal-600 focus:ring-opacity-50 hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-teal-600"
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
