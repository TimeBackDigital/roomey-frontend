const smsVerify = async (
  code: string, 
  phoneNumber: string, 
) => {
  const res = await fetch(`${process.env.API_URL}/api/auth-roomey/sms-verify`, {
    credentials: "include",
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      code: code, 
      phone_number: phoneNumber,
    }),
  });
  return res.json();
};

export default smsVerify;
