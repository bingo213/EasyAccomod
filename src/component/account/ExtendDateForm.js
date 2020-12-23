import React from 'react';

function ExtendDateForm() {
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="number"
          ref={register({
            required: 'Bạn cần điền thời gian gia hạn',
            min: {
              value: 1,
              message: 'Thời gian gia hạn không hợp lệ',
            },
            max: {
              value: 1000,
              message: 'Thời gian gia hạn quá lớn',
            },
          })}
        />
      </form>
    </div>
  );
}

export default ExtendDateForm;
