"use client"

import ComplaintActivity from '@/components/shared/complaint/complaint-activity';
import ComplaintDetails from '@/components/shared/complaint/complaint-details';

const ComplaintDetailsPage = () => {
  return (
  <div>
      <ComplaintDetails />
      <ComplaintActivity
        onSendMessage={(message, files) => {
          console.log("Message:", message);
          console.log("Attachments:", files);

          // Connect this to your backend API
        }}
        onViewAllAttachments={() => {
          console.log("View all attachments");
        }}
        onViewFullHistory={() => {
          console.log("View complaint history");
        }}
      />
    </div>
  )
}

export default ComplaintDetailsPage