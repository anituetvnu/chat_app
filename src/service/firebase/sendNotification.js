export default sendNotification = async (send_to_token, title, body) => {
  const FIREBASE_API_KEY =
    'AAAAErsIZ9o:APA91bGQvDAIofTk-JJnvBaCYGicl9CTCGhWmUgXuvbBpBTR5UGtG44cwacAI2vAAA10i7QHIhi0x6hk3lW3VG8TUic7mJoBpPNBQK9sEoYz_7DHrSgmMFvO33AaTrWh9D-GRbPOPbCp';
  const message = JSON.stringify({
    registration_ids: [send_to_token],
    notification: {
      title: title,
      body: body,
    },
  });
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'key=' + FIREBASE_API_KEY,
    },
    body: message,
  };
  fetch('https://fcm.googleapis.com/fcm/send', requestOptions)
    .then((response) => response.json())
    .then((data) => console.log('data: ', data))
    .catch((error) => {
      console.error(error);
    });
};
