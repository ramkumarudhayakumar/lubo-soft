import React, { useEffect, useState } from "react";
import "./Crud.css";
import { FaArrowLeft } from "react-icons/fa6";
import { FaCirclePlus } from "react-icons/fa6";
import { TbDatabaseImport } from "react-icons/tb";
import { MdCancel } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useFetchCollection } from "./hook/useFetchCollection";
import { useFirestore } from "./hook/useFirestore";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formVariants = {
  hidden: {
    x: 500,
  },
  visible: {
    x: 0,
    transition: {
      duration: 1,
      type: "spring",
      stiffness: 200,
      when: "beforeChildren",
    },
  },
};
const formChildSubVariants = {
  hidden: {
    scale: 0.9,
  },
  visible: {
    scale: 1,
    transition: {
      duration: 1,
      type: "spring",
      stiffness: 700,
    },
  },
};
export default function Crud() {
  const [cat_name, setCat_name] = useState(null);
  const [showPlaceholder, setShowPlaceholder] = useState(null);
  const [showButton, setShowButton] = useState(true);
  const { posts } = useFetchCollection("posts");
  const { addDocument, deleteDocument, updateDocument, error } =
    useFirestore("posts");
  function addDocumentHandleToInput(name) {
    setShowButton(false);
    setCat_name(name);
  }
  ll;
  function updateDocumentHandler(id) {
    if (cat_name) {
      updateDocument(id, { cat_name });
      setCat_name("");
      setShowButton(true);
    }
  }
  function addDocumentHandler() {
    if (cat_name) {
      addDocument({ deviceType: "web", username: "anvar", cat_name });
      setCat_name("");
      setShowPlaceholder("");
      toast.success("Category added successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      setShowPlaceholder("Please Enter Valid Data");
    }
  }
  function deleteDocumentHandler(id) {
    deleteDocument(id);
    toast.success("Category deleted successfully", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  function cancelDocumentHandler() {
    setShowButton(true);
    setCat_name("");
    setShowPlaceholder("");
  }

  function resetCheck() {}

  return (
    <main>
      <div className="container crud-container">
        <div className="crud-heading">
          <FaArrowLeft className="mb-1" />
          <h2>Categories</h2>
        </div>
        <motion.form variants={formVariants} initial="hidden" animate="visible">
          <div className="form-group">
            <label className="form-label label" for="crudInput">
              Add Main Category
            </label>
            <motion.div
              className="form-input-group"
              variants={formChildSubVariants}
            >
              <input
                type="text"
                value={cat_name}
                className="form-control input"
                id="crudInput"
                placeholder={showPlaceholder}
                onChange={(e) => setCat_name(e.target.value)}
              />
              {showButton ? (
                <button
                  type="button"
                  className="form-input-group-button "
                  onClick={addDocumentHandler}
                >
                  <TbDatabaseImport className="form-button1" />
                </button>
              ) : (
                <button
                  type="button"
                  className="form-input-group-button "
                  onClick={cancelDocumentHandler}
                >
                  <MdCancel className="form-button3" />
                </button>
              )}
            </motion.div>
          </div>
          <motion.table
            className="table table-bordered border-dark crud-table"
            variants={formChildSubVariants}
          >
            <thead className="table-secondary border-dark">
              <tr>
                <th scope="col-10">Main Category Name</th>
                <th scope="col-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {posts &&
                posts.map((post) => {
                  return (
                    <tr key={post.userid}>
                      <td className="col-10">{post.cat_name}</td>
                      <td className="col-2">
                        <div className="table-data-button-div">
                          <button
                            type="button"
                            className="table-button table-button1"
                            onClick={() =>
                              addDocumentHandleToInput(post.cat_name)
                            }
                          >
                            <FaPen />
                          </button>
                          <button
                            type="button"
                            className="table-button table-button2"
                            onClick={() => deleteDocumentHandler(post.id)}
                          >
                            <MdDelete />
                          </button>
                          <button
                            type="button"
                            className="table-button table-button3"
                            onClick={() => updateDocumentHandler(post.id)}
                          >
                            <FaCirclePlus />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </motion.table>
        </motion.form>
      </div>
      <ToastContainer />
    </main>
  );
}
