'use client';
import { Button } from '../button/Button';
import styles from './feedback.module.scss';
export const Feedback = () => {
	const handleClick = (
		e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
	) => {
		e.preventDefault();
		e.stopPropagation();
		console.log('---->');
	};
	return (
		<div className={styles.container} id='feedback-section'>
			<h2 className={`${styles.title} ${styles.upper}`}>
				Получить коммерческое предложение по email
			</h2>
			<form
				className={styles.form}
				id='feedback-form'
				action='/submit'
				method='POST'
				noValidate
				aria-label='Форма обратной связи'
			>
				<input
					className={styles.inputText}
					type='email'
					id='feedback-email'
					name='email'
					placeholder='Ваш email'
				/>
				<input
					className={styles.inputText}
					type='text'
					id='feedback-phone'
					name='phone'
					placeholder='Ваш номер телефона'
				/>
				<input
					className={styles.inputText}
					type='text'
					id='feedback-name'
					name='name'
					placeholder='Ваше имя'
				/>
				<textarea
					className={styles.inputTextarea}
					id='feedback-message'
					name='message'
					placeholder='Введите ваше сообщение'
					rows={4}
				></textarea>
				<Button
					type={'tertiary'}
					value={'Отправить'}
					onClick={handleClick}
					bold
				/>
			</form>
		</div>
	);
};
