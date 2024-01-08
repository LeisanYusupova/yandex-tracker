export const YandexAuthorization = () => {
  document.addEventListener("DOMContentLoaded", function() {
    window.onload = () => {
      window.YaSendSuggestToken('https://tracker.seven-group.pro/');
    }
  })
  return (
    <div></div>
  )
};
