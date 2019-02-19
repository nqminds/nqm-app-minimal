export const signIn = () => {
  // Redirect to server route to begin authentication process.
  const callback = window.location.href;
  window.location = `/auth/?rurl=${callback}`;
};

export const signUp = () => {
  // Redirect to server route to begin authentication process, and redirect to the register page.
  const callback = "/profile";
  window.location = `/auth/?rurl=${callback}`;
};
