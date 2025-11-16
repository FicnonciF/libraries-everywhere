import { useState } from "react"
import { Button } from "../ui/button"
import iphone from "../../assets/iphone.webp"
import { sectionTitle, h1Title } from '@/styles/typography'
import { type WaitlistFormData } from '@/types'

const Join = () => {
	const [formData, setFormData] = useState<WaitlistFormData>({
		name: '',
		email: '',
		supportType: ''
	})
	const [isSubmitting, setIsSubmitting] = useState(false)

	const API_BASE = import.meta.env.VITE_API_BASE_URL;

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value
		}))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			console.log('Submitting waitlist form:', {
				name: formData.name,
				email: formData.email,
				support: formData.supportType,
			});

			const response = await fetch(`${API_BASE}/api/waitlist`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
				body: JSON.stringify({
					name: formData.name,
					email: formData.email,
					supportType: formData.supportType,
				}),
			});

			console.log('Response status:', response.status);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
			}

			const result = await response.json();
			console.log('Success response:', result);

			setFormData({
				name: '',
				email: '',
				supportType: ''
			});
			alert('Thank you for joining our waitlist!');
		} catch (error) {
			console.error('Error submitting form:', error);
			alert(`Error: ${error}`);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section className="bg-[#525354] w-full min-h-screen px-6 sm:px-12 md:px-20 pt-52 flex flex-col md:flex-row items-start md:items-start justify-between gap-10 md:gap-16">

			{/* left section */}
			<div className="w-full md:flex-1">
				<div className="flex flex-col justify-between items-start mb-4">
					<p className={`${sectionTitle} text-white`}>Contribute</p>
					<h2 className={`${h1Title} text-white`}>Join Our Movement</h2>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4 md:mt-5">
					<div>
						<label htmlFor="name"
							className="block font-roboto text-xl font-medium text-white mb-1">Name</label>
						<input
							type="text"
							id="name"
							name="name"
							value={formData.name}
							onChange={handleInputChange}
							required
							disabled={isSubmitting}
							className="w-full px-3 py-2 focus:outline-none border-b-2 border-white text-white placeholder:text-white bg-transparent"
							placeholder="Enter your name"
						/>
					</div>

					<div>
						<label htmlFor="email"
							className="block font-roboto text-xl font-medium text-white mb-1">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleInputChange}
							required
							disabled={isSubmitting}
							className="w-full px-3 py-2 focus:outline-none border-b-2 border-white text-white placeholder:text-white bg-transparent"
							placeholder="Enter your email"
						/>
					</div>

					<div>
						<label htmlFor="supportType"
							className="block font-roboto text-xl font-medium text-white mb-1">How would you like to support us?</label>
						<select
							id="supportType"
							name="supportType"
							value={formData.supportType}
							onChange={handleInputChange}
							required
							disabled={isSubmitting}
							className="w-full px-3 py-2 disabled:bg-gray-100 border-b-2 border-white cursor-pointer text-white bg-transparent [&>option]:text-gray-800 [&>option]:bg-white"
						>
							<option value="">Select an option</option>
							<option value="donating books">Donating Books</option>
							<option value="donating money">Donating Money</option>
							<option value="volunteering">Volunteering</option>
						</select>
					</div>

					<div className="flex gap-3 pt-4">
						<Button
							type="submit"
							className="min-w-24 bg-white rounded-full font-roboto flex items-center justify-center px-4 py-2 font-bold text-base md:text-lg text-gray-700 transition-colors shadow-md cursor-pointer"
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Submitting...' : 'Submit'}
						</Button>
					</div>
				</form>
			</div>

			{/* right section */}
			<div className="hidden md:flex md:flex-1 items-center justify-center">
				<img src={iphone} alt="" className="lg:w-64 h-auto" />
			</div>
		</section>
	)
}

export default Join