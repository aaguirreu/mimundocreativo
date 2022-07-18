import { useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { Formik, Form } from "formik";
import Input from "@/components/Input";
import AddProductImage from "@/components/AddProductImage";
import axios from "axios";

const ProductSchema = Yup.object().shape({
  title: Yup.string().trim().required(),
  description: Yup.string().trim().required(),
  price: Yup.number().positive().integer().min(1).required(),
});

const ProductList = ({
  initialValues = null,
  redirectPath = "",
  buttonText = "Submit",
  onSubmit = () => null,
}) => {
  const router = useRouter();

  const [disabled, setDisabled] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialValues?.image ?? "");

  const upload = async (image) => {
    if (!image) return;

    let toastId;
    try {
      setDisabled(true);
      toastId = toast.loading("Uploading...");
      const { data } = await axios.post("/api/productsImage", { image });
      setImageUrl(data?.url);
      toast.success("Successfully uploaded", { id: toastId });
    } catch (e) {
      toast.error("Unable to upload", { id: toastId });
      setImageUrl("");
    } finally {
      setDisabled(false);
    }
  };

  const handleOnSubmit = async (values = null) => {
    let toastId;
    try {
      setDisabled(true);
      toastId = toast.loading("Submitting...");
      if (typeof onSubmit === "function") {
        await onSubmit({ ...values, image: imageUrl });
      }
      toast.success("Successfully submitted", { id: toastId });
      if (redirectPath) {
        router.push(redirectPath);
      }
    } catch (e) {
      toast.error("Unable to submit", { id: toastId });
      setDisabled(false);
    }
  };

  const { image, ...initialFormValues } = initialValues ?? {
    image: "",
    title: "",
    description: "",
    price: 0,
  };

  return (
    <div>
      <Formik
        initialValues={initialFormValues}
        validationSchema={ProductSchema}
        validateOnBlur={false}
        onSubmit={handleOnSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form className="space-y-6">
            <div className="space-y-6">
              <Input
                name="title"
                type="text"
                label="Título"
                placeholder="Ingresa el nombre del producto..."
                disabled={disabled}
              />

              <Input
                name="description"
                type="textarea"
                label="Descripción"
                placeholder="Ingresa una descripción...."
                disabled={disabled}
                rows={3}
              />

              <Input
                name="price"
                type="number"
                min="0"
                label="Precio"
                placeholder="100"
                disabled={disabled}
              />

            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={disabled || !isValid}
                className="px-4 py-3 ml-4 font-extrabold transition rounded-md bg-info hover:bg-opacity-50 hover:bg-success hover:text-primary focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-50 text-primary"
                >
                {isSubmitting ? "Submitting..." : buttonText}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="max-w-full mb-6">
        <AddProductImage
          initialImage={{ src: image, alt: initialFormValues.title }}
          onChangePicture={upload}
        />
      </div>
    </div>
  );
};

ProductList.propTypes = {
  initialValues: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,

  }),
  redirectPath: PropTypes.string,
  buttonText: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default ProductList;
