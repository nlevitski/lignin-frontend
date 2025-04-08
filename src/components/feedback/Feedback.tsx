'use client';
import Form from 'next/form';
import { submitFeedback } from './actions';
import { Button } from '../button/Button';
import styles from './feedback.module.scss';
import { useActionState, useEffect, useState } from 'react';

type FormState = {
	success: boolean;
	errors: {
		email: string;
		phone: string;
		name: string;
		message: string;
	};
	errorFields: string[];
	message: string;
	formData: {
		email: string;
		phone: string;
		name: string;
		message: string;
	};
};

export const Feedback = () => {
	const initialFormState: FormState = {
		success: false,
		errors: {
			email: '',
			phone: '',
			name: '',
			message: '',
		},
		errorFields: [],
		message: '',
		formData: {
			email: '',
			phone: '',
			name: '',
			message: '',
		},
	};

	// Состояние отправки формы хранится только в useState
	const [isSubmitted, setIsSubmitted] = useState(false);

	const [state, formAction, isPending] = useActionState<FormState, FormData>(
		(prev: FormState, formData: FormData) =>
			submitFeedback(formData).then((result) => ({
				...prev,
				...result,
			})),
		initialFormState
	);

	// Обновляем isSubmitted только при успешной отправке
	useEffect(() => {
		if (state.success) {
			setIsSubmitted(true);
		}
	}, [state.success]);

	return (
		<div className={styles.container} id='feedback-section'>
			<h2 className={`${styles.title} ${styles.upper}`}>
				Задать вопрос. Получить предложение
			</h2>
			{isSubmitted ? (
				<div className={styles.submitted}>
					<div className={styles.statusBox}>
						{'Спасибо! Данные успешно отправлены.'}
					</div>
				</div>
			) : (
				<Form
					className={styles.form}
					id='feedback-form'
					action={formAction}
					noValidate
					aria-label='Форма обратной связи'
				>
					<div className={styles.inputWrapper}>
						<input
							className={styles.inputText}
							type='email'
							id='feedback-email'
							name='email'
							placeholder='Ваш email'
							defaultValue={state?.formData?.email || ''}
						/>
						<p className={styles.errorMessage} id='feedback-email-error'>
							{state.errors.email}
						</p>
					</div>
					<div className={styles.inputWrapper}>
						<input
							className={styles.inputText}
							type='text'
							id='feedback-phone'
							name='phone'
							placeholder='Ваш номер телефона'
							defaultValue={state?.formData?.phone || ''}
						/>
						<p className={styles.errorMessage} id='feedback-phone-error'>
							{state.errors.phone}
						</p>
					</div>
					<div className={styles.inputWrapper}>
						<input
							className={styles.inputText}
							type='text'
							id='feedback-name'
							name='name'
							placeholder='Ваше имя'
							defaultValue={state?.formData?.name || ''}
						/>
						<p className={styles.errorMessage} id='feedback-name-error'>
							{state.errors.name}
						</p>
					</div>
					<div className={styles.inputTextareaWrapper}>
						<textarea
							className={styles.inputTextarea}
							id='feedback-message'
							name='message'
							placeholder='Введите ваше сообщение'
							rows={4}
							defaultValue={state?.formData?.message || ''}
						></textarea>
						<p className={styles.errorMessage} id='feedback-message-error'>
							{state.errors.message}
						</p>
					</div>
					<Button
						type={'tertiary'}
						value={'Отправить'}
						bold
						disabled={isPending}
					/>
				</Form>
			)}
		</div>
	);
};
