import { useState } from "react"
import { Button } from "../ui/button"

const Join = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		supportType: 'donating books'
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

			setFormData({ name: '', email: '', supportType: 'donating books' });
			alert('Thank you for joining our waitlist!');
		} catch (error) {
			console.error('Error submitting form:', error);
			alert(`Error: ${error}`);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-2xl font-semibold">Join Our Waitlist</h2>
			</div>

			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1"> Name </label>
					<input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleInputChange}
						required
						disabled={isSubmitting}
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
						placeholder="Enter your name"
					/>
				</div>

				<div>
					<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1"> Email </label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleInputChange}
						required
						disabled={isSubmitting}
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
						placeholder="Enter your email"
					/>
				</div>

				<div>
					<label htmlFor="supportType" className="block text-sm font-medium text-gray-700 mb-1">
						How would you like to support us?
					</label>
					<select
						id="supportType"
						name="supportType"
						value={formData.supportType}
						onChange={handleInputChange}
						required
						disabled={isSubmitting}
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
					>
						<option value="" disabled>Select an option</option>
						<option value="donating books">Donating Books</option>
						<option value="donating money">Donating Money</option>
						<option value="volunteering">Volunteering</option>
					</select>
				</div>

				<div className="flex gap-3 pt-4">
					<Button
						type="submit"
						className="flex-1 cursor-pointer hover:bg-black hover:text-white"
						disabled={isSubmitting}
					>
						{isSubmitting ? 'Submitting...' : 'Join Waitlist'}
					</Button>
				</div>
			</form>
		</div>
	)
}

export default Join