'use client';
import { useState } from 'react';
import { DeletePost } from '@compoents/util/post-util';
import { RefreshAccessToken } from '@compoents/util/http';

export default function DeletePostButton({ postId, accessToken }) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function deletePostDataHandler() {
    setIsDeleting(true);
    const response = await DeletePost(postId, accessToken);
    if (response.state == 'Jwt Expired') {
      const NewaccessToken = await RefreshAccessToken();
      await DeletePost(postId, NewaccessToken);
    }
    setIsDeleting(false);
    window.location.href = '/';
  }

  return (
    <button
      className="btn"
      onClick={deletePostDataHandler}
      disabled={isDeleting}
    >
      {isDeleting ? '삭제 중...' : '삭제'}
    </button>
  );
}

// .btn{
//   width: 65px;
//   height: 25px;
//   border: 0;
//   border-radius: 10px;
//   margin-left: 83%;
//   margin-bottom: 10px;
//   margin-top: 10px;
// }
