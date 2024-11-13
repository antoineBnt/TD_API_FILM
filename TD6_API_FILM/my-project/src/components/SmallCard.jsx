import React, { useState } from "react";
import { motion, AnimatePresence, useTransform } from "framer-motion";

function SmallCard({
  name,
  genres,
  runtime,
  rating,
  summary,
  image,
  index,
  springY,
}) {
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const y = useTransform(springY, (value) => {
    return -value * 0.2;
  });

  const truncateSummary = (text, maxLength) => {
    if (!text) return "Pas de description disponible.";
    const cleanText = text.replace(/<[^>]+>/g, "");
    return cleanText.length > maxLength
      ? cleanText.substring(0, maxLength) + "..."
      : cleanText;
  };

  const openModal = (title, content) => {
    setModalContent({ title, content });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <motion.section
      style={{ y }}
      className="relative w-max h-max bg-GrisClair flex flex-row justify-center items-center rounded-3xl p-4 gap-4 backdrop-blur-[16px] z-10 overflow-hidden"
    >
      <article className="flex flex-col gap-4 w-max">
        <article className="flex flex-row items-start gap-4 w-max">
          <div className="w-full">
            {image && (
              <img
                className="h-60 object-cover w-full rounded-3xl"
                src={image}
                alt={name}
              />
            )}
          </div>
          <article className="flex gap-2 flex-col">
            <div className="flex flex-col bg-GrisInter p-4 rounded-full hover:bg-orange duration-200 active:bg-orange">
              <h2
                className="text-[16px] font-medium text-white font-sf-pro cursor-pointer"
                onClick={() =>
                  openModal(
                    "Genre",
                    genres.length > 0 ? genres.join(", ") : "N/A"
                  )
                }
              >
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.7885 7.99937H11.4007L19.2897 5.93626C19.4443 5.89588 19.5893 5.8256 19.7163 5.72946C19.8433 5.63333 19.9499 5.51324 20.0299 5.37612C20.1098 5.239 20.1616 5.08757 20.1822 4.93054C20.2028 4.77351 20.1918 4.61399 20.1499 4.46118L19.3261 1.46103C19.1845 0.95564 18.8477 0.525836 18.3885 0.264716C17.9293 0.00359647 17.3847 -0.0678134 16.8727 0.0659546L1.4935 4.08616C1.23727 4.15229 0.996918 4.26833 0.786476 4.4275C0.576034 4.58668 0.399722 4.78579 0.267839 5.01321C0.135707 5.23762 0.050221 5.48594 0.016411 5.74355C-0.0173989 6.00117 0.00115031 6.26288 0.0709673 6.51329L0.807976 9.19943V17.9999C0.807976 18.5304 1.02071 19.0391 1.39939 19.4142C1.77806 19.7893 2.29165 20 2.82718 20H18.9808C19.5163 20 20.0299 19.7893 20.4086 19.4142C20.7873 19.0391 21 18.5304 21 17.9999V9.19943C21 8.88116 20.8724 8.57592 20.6452 8.35086C20.4179 8.1258 20.1098 7.99937 19.7885 7.99937ZM10.59 4.19017L12.4366 5.24623L9.81665 5.93126L7.97009 4.87521L10.59 4.19017ZM17.0969 2.49008L17.4916 3.92516L15.7622 4.37718L13.9156 3.32012L17.0969 2.49008ZM4.64446 5.74525L6.49102 6.79931L2.91703 7.73436L2.5243 6.29928L4.64446 5.74525ZM18.577 17.5999H3.23102V10.3995H18.577V17.5999Z"
                    fill="white"
                  />
                </svg>
              </h2>
              <p className="text-[13px] font-light text-GrisText"></p>
            </div>
            <div
              className="bg-GrisInter p-4 rounded-full cursor-pointer w-full hover:bg-bleu duration-200 active:bg-bleu"
              onClick={() => openModal("Note", rating ? rating : "N/A")}
            >
              <h2 className="text-[16px] font-medium text-white font-sf-pro">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9.20831 0.620635C9.31836 0.431795 9.476 0.275109 9.6655 0.166209C9.855 0.0573086 10.0697 0 10.2883 0C10.5069 0 10.7216 0.0573086 10.9111 0.166209C11.1006 0.275109 11.2583 0.431795 11.3683 0.620635L14.1633 5.41864L19.5913 6.59464C19.8048 6.64103 20.0024 6.74258 20.1645 6.88917C20.3265 7.03575 20.4473 7.22225 20.5148 7.43006C20.5823 7.63787 20.5941 7.85974 20.5491 8.07355C20.5041 8.28737 20.4038 8.48565 20.2583 8.64863L16.5583 12.7896L17.1183 18.3146C17.1404 18.5322 17.105 18.7517 17.0157 18.9513C16.9265 19.151 16.7864 19.3237 16.6094 19.4522C16.4325 19.5807 16.225 19.6606 16.0076 19.6838C15.7901 19.7071 15.5704 19.6729 15.3703 19.5846L10.2883 17.3446L5.20632 19.5846C5.00623 19.6729 4.78651 19.7071 4.56907 19.6838C4.35163 19.6606 4.1441 19.5807 3.96719 19.4522C3.79028 19.3237 3.65018 19.151 3.56088 18.9513C3.47159 18.7517 3.43622 18.5322 3.45832 18.3146L4.01832 12.7896L0.318315 8.64964C0.172543 8.48666 0.0720706 8.2883 0.026929 8.07435C-0.0182127 7.86041 -0.00644447 7.63837 0.0610588 7.43039C0.128562 7.22242 0.249439 7.03579 0.411621 6.88913C0.573804 6.74248 0.771618 6.64093 0.985315 6.59464L6.41332 5.41864L9.20831 0.620635ZM10.2883 2.73964L7.97532 6.71163C7.88786 6.86156 7.77013 6.99162 7.62964 7.09355C7.48915 7.19547 7.32898 7.26702 7.15932 7.30363L2.66732 8.27664L5.72932 11.7036C5.96332 11.9656 6.07632 12.3136 6.04132 12.6626L5.57832 17.2356L9.78432 15.3816C9.94313 15.3117 10.1148 15.2755 10.2883 15.2755C10.4619 15.2755 10.6335 15.3117 10.7923 15.3816L14.9983 17.2356L14.5353 12.6626C14.5177 12.49 14.5363 12.3155 14.5898 12.1504C14.6434 11.9853 14.7307 11.8331 14.8463 11.7036L17.9093 8.27664L13.4173 7.30363C13.2477 7.26702 13.0875 7.19547 12.947 7.09355C12.8065 6.99162 12.6888 6.86156 12.6013 6.71163L10.2883 2.73964Z"
                    fill="white"
                  />
                </svg>
              </h2>
            </div>
            <div
              className="bg-GrisInter p-4 rounded-full cursor-pointer w-full hover:bg-orange duration-200 active:bg-orange"
              onClick={() =>
                openModal("Durée", runtime ? `${runtime} minutes` : "N/A")
              }
            >
              <h2 className=" font-medium text-white font-sf-pro">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 13C1 14.5759 1.31039 16.1363 1.91345 17.5922C2.5165 19.0481 3.40042 20.371 4.51472 21.4853C5.62902 22.5996 6.95189 23.4835 8.4078 24.0866C9.86371 24.6896 11.4241 25 13 25C14.5759 25 16.1363 24.6896 17.5922 24.0866C19.0481 23.4835 20.371 22.5996 21.4853 21.4853C22.5996 20.371 23.4835 19.0481 24.0866 17.5922C24.6896 16.1363 25 14.5759 25 13C25 9.8174 23.7357 6.76516 21.4853 4.51472C19.2348 2.26428 16.1826 1 13 1C9.8174 1 6.76516 2.26428 4.51472 4.51472C2.26428 6.76516 1 9.8174 1 13Z"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13 6.3335V13.0002L17 17.0002"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </h2>
            </div>
            <div
              className=" p-4 bg-GrisInter rounded-full cursor-pointer overflow-hidden hover:bg-bleu duration-200 active:bg-bleu"
              onClick={() =>
                openModal("Description", truncateSummary(summary, 250))
              }
            >
              <h2 className="text-[16px] font-medium text-white font-sf-pro">
                <svg
                  width="24"
                  height="18"
                  viewBox="0 0 24 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1.125 0C0.826631 0 0.540483 0.118526 0.329505 0.329505C0.118526 0.540483 0 0.826631 0 1.125L0 3.375C0 3.67337 0.118526 3.95952 0.329505 4.1705C0.540483 4.38147 0.826631 4.5 1.125 4.5C1.42337 4.5 1.70952 4.38147 1.9205 4.1705C2.13147 3.95952 2.25 3.67337 2.25 3.375V2.25H6.375V15.75H5.625C5.32663 15.75 5.04048 15.8685 4.8295 16.0795C4.61853 16.2905 4.5 16.5766 4.5 16.875C4.5 17.1734 4.61853 17.4595 4.8295 17.6705C5.04048 17.8815 5.32663 18 5.625 18H9.375C9.67337 18 9.95952 17.8815 10.1705 17.6705C10.3815 17.4595 10.5 17.1734 10.5 16.875C10.5 16.5766 10.3815 16.2905 10.1705 16.0795C9.95952 15.8685 9.67337 15.75 9.375 15.75H8.625V2.25H12.75V3.375C12.75 3.67337 12.8685 3.95952 13.0795 4.1705C13.2905 4.38147 13.5766 4.5 13.875 4.5C14.1734 4.5 14.4595 4.38147 14.6705 4.1705C14.8815 3.95952 15 3.67337 15 3.375V1.125C15 0.826631 14.8815 0.540483 14.6705 0.329505C14.4595 0.118526 14.1734 0 13.875 0H1.125ZM12 8.625C12 8.32663 12.1185 8.04048 12.3295 7.8295C12.5405 7.61853 12.8266 7.5 13.125 7.5H22.875C23.1734 7.5 23.4595 7.61853 23.6705 7.8295C23.8815 8.04048 24 8.32663 24 8.625C24 8.92337 23.8815 9.20952 23.6705 9.42049C23.4595 9.63147 23.1734 9.75 22.875 9.75H13.125C12.8266 9.75 12.5405 9.63147 12.3295 9.42049C12.1185 9.20952 12 8.92337 12 8.625ZM12 13.875C12 13.5766 12.1185 13.2905 12.3295 13.0795C12.5405 12.8685 12.8266 12.75 13.125 12.75H22.875C23.1734 12.75 23.4595 12.8685 23.6705 13.0795C23.8815 13.2905 24 13.5766 24 13.875C24 14.1734 23.8815 14.4595 23.6705 14.6705C23.4595 14.8815 23.1734 15 22.875 15H13.125C12.8266 15 12.5405 14.8815 12.3295 14.6705C12.1185 14.4595 12 14.1734 12 13.875Z"
                    fill="white"
                  />
                </svg>
              </h2>
            </div>
          </article>
        </article>
        <div className="w-full p-4 bg-GrisInter rounded-3xl">
          <h2
            className="text-[16px] font-medium text-white font-sf-pro cursor-pointer"
            onClick={() => openModal("Titre", name)}
          ></h2>
          <p className="text-[20px] font-light text-white font-sf-pro">
            {name}
          </p>
        </div>
      </article>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0  flex items-center justify-center rounded-3xl"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0, y: 50 }}
              transition={{
                scale: { type: "spring", stiffness: 120, damping: 20 },
                y: { duration: 0.5, ease: "easeInOut" },
              }}
              className="bg-modal rounded-lg w-11/12 h-5/6 max-w-md max-h-full p-6 relative shadow-lg bg-opacity-10"
            >
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 text-xl"
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4">{modalContent.title}</h2>
              <div className="text-GrisText">{modalContent.content}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

export default SmallCard;
