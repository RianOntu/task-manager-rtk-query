import React from "react";

export default function TeamMember() {
  return (
    <div className='mt-8'>
      <h3 className='text-xl font-bold'>Team Members</h3>
      <div className='mt-3 space-y-4'>
        <div className='checkbox-container'>
          <img src='/avatars/sumit.png' className='team-avater' />
          <p className='label'>Sumit Saha</p>
        </div>
      </div>
    </div>
  );
}
