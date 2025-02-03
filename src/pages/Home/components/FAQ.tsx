import { useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { faqs } from "../../../constants/FAQ";

const FAQ = () => {
  //check the item is clicked by id

  const [openFaqs, setOpenFaqs] = useState<number[]>([]);

  const toggleFAQ = (id: number) => {
    setOpenFaqs(
      (prevOpenFaqs) =>
        prevOpenFaqs.includes(id)
          ? prevOpenFaqs.filter((faqId) => faqId !== id) // Close if already open
          : [...prevOpenFaqs, id] // Open if not open
    );
  };

  return (
    <section className="bg-white px-[1rem] pb-[1.5rem]">
      <h2 className="text-center text-black text-[2.5rem] font-semibold my-10">
        Frequently Asked Questions
      </h2>

      <div
        className={`faq-container w-full md:w-[90%] lg:w-[80%]  mx-auto flex flex-col gap-4`}
      >
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className={`faq-item  rounded-md   ${
              openFaqs.includes(faq.id)
                ? "border border-[#43a047] px-4 py-5"
                : ""
            }`}
          >
            <div
              className={`flex items-center justify-between gap-1 text-2xl  cursor-pointer

                 ${
                   openFaqs.includes(faq.id)
                     ? "rounded-t-md"
                     : "rounded-md bg-gradient-to-br from-lightGreen to-paleGreen py-5 px-4"
                 }`}
              onClick={() => toggleFAQ(faq.id)}
            >
              <h3 className="faq-title font-medium">{faq.title}</h3>
              {openFaqs.includes(faq.id) ? (
                <MdOutlineKeyboardArrowUp className="shrink-0" size={30} />
              ) : (
                <MdOutlineKeyboardArrowDown className="shrink-0" size={30} />
              )}
            </div>

            {openFaqs.includes(faq.id) && (
              <>
                <div className="border w-full mx-auto my-5 text-black h-[1px]" />
                <p className="faq-answer text-lg max-sm:text-base">
                  {faq.answer}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
