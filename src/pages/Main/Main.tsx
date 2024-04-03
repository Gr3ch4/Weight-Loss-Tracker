import React, { useState } from 'react';
import { db } from '../../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import './Main.css';

export default function Main() {
  const [date, setDate] = useState('');
  const [weight, setWeight] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Проверяем, есть ли файл изображения
    if (!imageFile) {
      console.error('No image file selected.');
      return;
    }

    const docum = { date, weight, imageUrl };

    try {
      // Добавляем документ в коллекцию 'weight'
      const weightCollectionRef = collection(db, 'weight');
      const docRef = await addDoc(weightCollectionRef, docum);
      console.log('Weight document added successfully!', docRef.id);

      // Загружаем файл изображения в Firebase Storage
      const storage = getStorage();
      const storageRef = ref(storage, 'images/' + imageFile.name);
      await uploadBytes(storageRef, imageFile);

      // Получаем URL загруженного изображения
      const url = await getDownloadURL(storageRef);
      setImageUrl(url);
      console.log('Image uploaded successfully!', url);
    } catch (error) {
      console.error('Error adding weight document or uploading image: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
      <label>
        <span>Выбор даты</span>
        <input type='date' onChange={(e) => setDate(e.target.value)} value={date} />
      </label>
      <label>
        <span>Укажите свой текущий вес</span>
        <input type='number' onChange={(e) => setWeight(e.target.value)} value={weight} />
      </label>
      <label className='file-reader'>
        <span>Загрузите фото</span>
        <input type='file' accept='image/*' onChange={handleImageChange} />
      </label>
      {imageUrl && <img src={imageUrl} alt='uploaded' />}
      <button>Подтвердить</button>
    </form>
  );
}