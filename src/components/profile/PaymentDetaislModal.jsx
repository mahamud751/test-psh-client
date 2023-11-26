import React, { useRef } from "react";
import right from "../../assets/img/Right.png";
import logo from "../../assets/img/logo.png";

import ReactToPrint from "react-to-print";
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";

import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import { AiOutlineClose } from "react-icons/ai";

const PaymentDetaislModal = ({
  handleDetailsShow,
  detailsShow,
  seeTransaction,
  branch,
}) => {
  const ref = useRef();
  const pdfRef = useRef();
  const currentDate = new Date().toISOString().split("T")[0];

  const findOrderBranch = branch.find(
    (branch) => branch?._id === seeTransaction?.bookingInfo?.data?.branch
  );

  return (
    <Dialog
      open={detailsShow}
      handler={handleDetailsShow}
      size="md"
      className="px-5"
    >
      <DialogHeader>
        {" "}
        <h2 className="text-[32px] font-bold">Transaction</h2>
      </DialogHeader>
      <DialogBody divider className="  overflow-x-hidden">
        <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2">
          <div>
            <label htmlFor="" className="font-bold">
              Booking Id
            </label>
            <p>{seeTransaction?.orderId?.slice(19)}</p>
          </div>
          <div>
            {" "}
            <label htmlFor="" className="font-bold">
              Payment Date
            </label>
            <p> {seeTransaction?.paymentDate?.split("T")[0]}</p>
          </div>
          <div>
            {" "}
            <label htmlFor="" className="font-bold">
              Payment Amount
            </label>
            <p> Tk {seeTransaction?.receivedTk}</p>
          </div>
          <div>
            {" "}
            <label htmlFor="" className="font-bold">
              Payment Method
            </label>
            <p> {seeTransaction?.paymentType}</p>
          </div>
          {seeTransaction?.paymentType === "Bkash" ||
          seeTransaction?.paymentType === "Nagad" ||
          seeTransaction?.paymentType === "dutch" ? (
            <>
              <div>
                {" "}
                <label htmlFor="" className="font-bold">
                  Payment Number
                </label>
                <p> {seeTransaction?.paymentNumber}</p>
              </div>
              <div>
                {" "}
                <label htmlFor="" className="font-bold">
                  Transaction Id
                </label>
                <p> {seeTransaction?.paymentNumber}</p>
              </div>
            </>
          ) : (
            ""
          )}
          {seeTransaction?.paymentType === "Bank" ? (
            <>
              <div>
                {" "}
                <label htmlFor="" className="font-bold">
                  Bank Name
                </label>
                <p> {seeTransaction?.bankName}</p>
              </div>
              <div>
                {" "}
                <label htmlFor="" className="font-bold">
                  Bank Holding Name
                </label>
                <p> {seeTransaction?.bankHoldingName}</p>
              </div>
            </>
          ) : (
            ""
          )}

          <div>
            <label htmlFor="" className="font-bold">
              Receiver Name
            </label>
            <p> {seeTransaction?.receiverName}</p>
          </div>
        </div>
      </DialogBody>

      <div
        onClick={() => handleDetailsShow(null)}
        className="absolute top-2 right-2 cursor-pointer"
      >
        <span>
          <AiOutlineClose style={{ width: "30px", height: "30px" }} />
        </span>
      </div>
    </Dialog>
  );
};

export default PaymentDetaislModal;
