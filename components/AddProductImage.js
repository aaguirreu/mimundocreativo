import { useState, useRef } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import toast from "react-hot-toast";
import classNames from "classnames";
import { CloudUploadIcon } from "@heroicons/react/outline";

const AddProductImage = ({
  label = "Imagen",
  initialImage = null,
  objectFit = "cover",
  accept = ".png, .jpg, .jpeg, .gif .jiff",
  sizeLimit = 10 * 1024 * 1024,
  onChangePicture = () => null,
}) => {
  const pictureRef = useRef();
  const [image, setImage] = useState(initialImage ?? null);
  const [updatingPicture, setUpdatingPicture] = useState(false);
  const [pictureError, setPictureError] = useState(null);

  const handleOnChangePicture = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const fileName = file?.name?.split(".")?.[0] ?? "New file";

    reader.addEventListener(
      "load",
      async function () {
        try {
          setImage({ src: reader.result, alt: fileName });
          if (typeof onChangePicture === "function") {
            await onChangePicture(reader.result);
          }
        } catch (err) {
          toast.error("Unable to update image");
        } finally {
          setUpdatingPicture(false);
        }
      },
      false
    );

    if (file) {
      if (file.size <= sizeLimit) {
        setUpdatingPicture(true);
        setPictureError("");
        reader.readAsDataURL(file);
      } else {
        setPictureError("File size is exceeding 10MB.");
      }
    }
  };

  const handleOnClickPicture = () => {
    if (pictureRef.current) {
      pictureRef.current.click();
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-secondary ">{label}</label>

      <button
        disabled={updatingPicture}
        onClick={handleOnClickPicture}
        className={classNames(
          "relative border-secondary aspect-video overflow-hidden rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition group focus:outline-none",
          image?.src
            ? "hover:opacity-50 disabled:hover:opacity-100"
            : "border-2 border-dotted hover:border-opacity-50 hover:border-secondary focus:border-secondary disabled:hover:border-gray-200"
        )}
      >
        {image?.src ? (
          <Image
            src={image.src}
            alt={image?.alt ?? ""}
            layout="fill"
            objectFit={objectFit}
          />
        ) : null}

        <div className="flex items-center justify-center">
          {!image?.src ? (
            <div className="flex flex-col items-center space-y-2">
              <div className="p-2 transition rounded-full bg-primary shrink-0 group-hover:scale-110 group-focus:scale-110">
                <CloudUploadIcon className="w-4 h-4 transition text-secondary" />
              </div>
              <span className="text-xs font-semibold transition text-secondary">
                {updatingPicture
                  ? "Image Uploading..."
                  : "Upload product Image"}
              </span>
            </div>
          ) : null}
          <input
            ref={pictureRef}
            type="file"
            accept={accept}
            onChange={handleOnChangePicture}
            className="hidden"
          />
        </div>
      </button>

      {pictureError ? (
        <span className="text-sm text-red-600">{pictureError}</span>
      ) : null}
    </div>
  );
};

AddProductImage.propTypes = {
  label: PropTypes.string,
  initialImage: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  }),
  objectFit: PropTypes.string,
  accept: PropTypes.string,
  sizeLimit: PropTypes.number,
  onChangePicture: PropTypes.func,
};

export default AddProductImage;

export async function getInitialProps({ req }) {
  const { origin } = absoluteUrl(req, req.headers.host);
  console.log("Requested URL ->", origin);
  // (or) other way
  const host = absoluteUrl(req, req.headers.host);
  console.log("Requested URL ->", host.origin);
}

