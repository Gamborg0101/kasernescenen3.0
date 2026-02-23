'use server';
import { createUser } from './createUser';

export async function OpretActions(formData: FormData) {
  await createUser({
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    phone: Number(formData.get('phone')),
    email: formData.get('email') as string,
    studentNumber: Number(formData.get('studentNumber')),
    cardNumber: Number(formData.get('cardNumber')),
    category: formData.get('studie') as string,
  });
}
