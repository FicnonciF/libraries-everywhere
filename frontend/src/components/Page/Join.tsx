import { useState } from "react"
import { Button } from "../ui/button"
import iphone from "../../assets/iphone.webp"

const Join = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		supportType: ''
	})
	const [isSubmitting, setIsSubmitting] = useState(false)

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

			const response = await fetch('http://localhost:3001/api/waitlist', {
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
		<section className="container bg-[#525354] flex items-center justify-between w-full h-screen px-20 gap-20">

			{/* left section */}
			<div className="flex-1 md:mt-15">
				<div className="flex flex-col justify-between items-start mb-4">
					<p className="text-2xl md:text-3xl font-roboto font-medium text-white">Contribute</p>
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold font-playfair text-white">Join Our Movement</h2>
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
							className="w-full px-3 py-2 focus:outline-none border-b-2 border-white text-white placeholder:text-white"
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
							className="w-full px-3 py-2 focus:outline-none border-b-2 border-white text-white placeholder:text-white"
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
							className="w-20 h-5 bg-white rounded-full font-roboto flex items-center justify-center p-4.5 font-bold text-md text-gray-700 transition-colors shadow-md cursor-pointer"
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Submitting...' : 'Submit'}
						</Button>
					</div>
				</form>
			</div>

			{/* right section */}
			<div className="flex-1 flex items-center justify-center">
				<img src={iphone} alt="" width={300} />
			</div>
		</section>
	)
}

export default Join