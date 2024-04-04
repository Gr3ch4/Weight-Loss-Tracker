import React, { useState } from 'react';
import { db } from '../../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space, InputNumber, Button  } from 'antd';


import './Main.css';
import ImageReader from '../../components/ImageReader/ImageReader';

export default function Main() {
  const [date, setDate] = useState<string | string[]>('');
  const [weight, setWeight] = useState<number | undefined>(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageReaderFileChange = (file: File | null, imageUrl: string | null | undefined) => {
    setImageFile(file);
    setImageUrl(imageUrl ?? null); // Если imageUrl undefined, передаем null
  };
  const dateChange: DatePickerProps['onChange'] = (date, dateString) => {
    setDate(dateString)
  };

  const weightChange = (value: number | null | undefined) => {
    if (typeof value === 'number' && value !== null) {
      setWeight(value);
    }
  }


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Проверяем, есть ли файл изображения
    if (!imageFile) {
      console.error('No image file selected.');
      return;
    }
  
    try {
      // Загружаем файл изображения в Firebase Storage
      const storage = getStorage();
      const storageRef = ref(storage, 'images/' + imageFile.name);
      await uploadBytes(storageRef, imageFile);
  
      // Получаем URL загруженного изображения
      const url = await getDownloadURL(storageRef);
  
      // Обновляем imageUrl
      setImageUrl(url);
      console.log('Image uploaded successfully!', url);
  
      // Теперь обновляем docum с актуальным значением imageUrl
      const docum = { date, weight, imageUrl: url };
  
      // Добавляем документ в коллекцию 'weight'
      const weightCollectionRef = collection(db, 'weight');
      const docRef = await addDoc(weightCollectionRef, docum);
      console.log('Weight document added successfully!', docRef.id);
    } catch (error) {
      console.error('Error adding weight document or uploading image: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
        <Space direction="vertical">
              <DatePicker onChange={dateChange} />
              <InputNumber min={1} max={200}  onChange={weightChange} value={weight !== null ? weight : undefined}/>              
              <ImageReader onFileChange={handleImageReaderFileChange} />
              <Button htmlType="submit" type="primary" size={'large'}>Primary</Button>
        </Space>
      
    </form>
  );
}