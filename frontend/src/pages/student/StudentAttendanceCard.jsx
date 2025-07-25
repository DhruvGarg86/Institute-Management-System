import React from "react";
import { CardComponent } from "@syncfusion/ej2-react-layouts";
import { ProgressBarComponent } from "@syncfusion/ej2-react-progressbar";

function StudentAttendanceCard() {
  return (
    <CardComponent
      style={{ backgroundColor: "#eaebef" }}
      className="w-100"
      header={{ text: "ATTENDANCE" }}
    >
      <div className="text-center p-3">
        <h3>68%</h3>
        <ProgressBarComponent
          id="percentage"
          type="Linear"
          height="20"
          value={68}
          showProgressValue={true}
        />
      </div>
    </CardComponent>
  );
}

export default StudentAttendanceCard;
