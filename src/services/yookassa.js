import axios from "axios";

const { SHOP_ID, YOOKASSA_V3_URL, YOOKASSA_API } = process.env

export const getBillingLink = async (tariff) => {
  try {
    const { data } = await axios.post(
      YOOKASSA_V3_URL + '/payments',
      {
        'amount': {
          'value': tariff.price + '.00',
          'currency': 'RUB'
        },
        'capture': true,
        'confirmation': {
          'type': 'redirect',
          'return_url': 'https://t.me/topic_kb_crypto_bot'
        },
        // 'description': `Тариф - ${sub.name}, Срок подписки: ${sub.duration}`
      },
      {
        headers: {
          'Idempotence-Key': Date.now(),
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + Buffer.from(SHOP_ID + ':' + YOOKASSA_API).toString('base64')
        }
      }
    );
    return data
  } catch (e) {
    console.log(e);
  }
}
export const getStatus = async (payment_id) => {
  try {
    const { data } = await axios.get(
      YOOKASSA_V3_URL + '/payments/' + payment_id,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + Buffer.from(SHOP_ID + ':' + YOOKASSA_API).toString('base64')
        }
      }
    );
    return data
  } catch (e) {
    console.log(e);
  }
}
