function Loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center gap-5">
      <svg className="w-10 h-10 animate-spin" width="40px" height="40px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none"><g fill="#000000" fillRule="evenodd" clipRule="evenodd"><path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z" opacity=".2"/><path d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z"/></g></svg>
      <h1 className="text-2xl">Loading...</h1>
    </div>
  );
}

export default Loading;
