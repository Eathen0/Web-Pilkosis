/* eslint-disable @typescript-eslint/no-unused-vars */
import logoSmk from "@assets/logo/logo-smk.png";
import logoOsis from "@assets/logo/logo-osis.png";

import primaryBg from "@assets/images/login-bg.png";
import decorations from "@assets/svg/decorations.svg";
import loginText from "@assets/svg/login-text.svg";
import secondaryBg from "@assets/svg/login-bg-Secondary.svg";
import secondaryBg2 from "@assets/svg/login-bg-Secondary-2.svg";

import { Bounce, ToastContainer, toast } from "react-toastify";
import "@toastifyCss";

import { useEffect, useState } from "react";
import { Form, Link, useActionData, useLoaderData, useNavigate } from "react-router-dom";
import CInput from "@components/input";
import CButton from "@components/button";
import Popup from "@components/popup";
import { IChat } from "@components/icons";


const noWa = import.meta.env.VITE_NO_WA_CHATBOT; //? chatbot

export default function LoginPage () {
	const navigate = useNavigate();
	const authResult = (useLoaderData() as {auth: Promise<any>}).auth;
	const actionData = useActionData();
	useEffect(() => {
		authResult.then((res) => {
			if (Array.isArray(res)) {
				switch (res[1].role) {
					case 'admin':
						return navigate('/admin')
					case 'khusus': //? panitia
						return navigate('/panitia')
					default: //? user
						return navigate('/voting')
				}
			}
		})
		document.title = "Web Pilkosis - Login";
	}, []);

	const [loading, setLoading] = useState(false)
	useEffect(() => {
		if (actionData) {
			if (actionData instanceof Error) {
				toast.error(actionData.message)
			}
			setLoading(false)
		}
	}, [actionData])

	const [CPopup, triggerPopup] = Popup()

	
	const handdleGetPass = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault()
		const form = new FormData((ev.target as HTMLFormElement));
		const data = []
		for (const [_,value] of form) {
			data.push(value.toString().toLowerCase().replace(/\s/g, '_'))
		}

		const url = `https://wa.me/${noWa}?text=/${data[0]}-${data[1]}`
		window.open(url, '_blank')
	}

	return (
		<div className="flex items-center justify-center flex-col lg:flex-row h-screen lg:justify-between px-[5%]">
			<CPopup>
				<form onSubmit={handdleGetPass}>
					<h1 className="text-center text-xl">Ambil Password</h1>
					<CInput required type="number" name="nis" placeholder="nomor NIS mu" className="lg:w-[30vw] w-[80vw] max-w-[30rem]" />
					<CInput required name="nama_ibu" placeholder="nama ibu mu" className="lg:w-[30vw] w-[80vw] max-w-[30rem]" />
					<CButton type="submit" className="self-end px-10 mt-10">Kirim</CButton>
				</form>
			</CPopup>
			{/*//? BACKGROUNDS */}
			<img src={primaryBg} className="w-full h-screen -z-10 absolute top-0 left-0 object-cover pointer-events-none" loading="lazy" />
			{/* bg on moblie */}
			<img src={secondaryBg} className="block lg:hidden w-full h-screen -z-10 absolute top-0 left-0 object-cover pointer-events-none" />
			{/* bg on desktop */}
			<img src={secondaryBg2} className="hidden lg:block w-full h-screen -z-10 absolute top-0 left-0 object-cover pointer-events-none" />

			{/*//? LOGO */}
			<img src={logoSmk} className="md:h-20 h-16 -z-10 absolute lg:translate-x-0 -translate-x-3/4 top-10 lg:right-40 bg-white rounded-full object-cover" loading="lazy" />
			<img src={logoOsis} className="md:h-20 h-16 -z-10 absolute lg:translate-x-0 translate-x-3/4 top-10 lg:right-14 object-cover" loading="lazy" />

			<Form onSubmit={() => setLoading(true)} className="z-10 flex flex-col items-stretch" method="post" action=""> {/*//? action to this route it self */}
				<img src={loginText} className="pointer-events-none self-center lg:block hidden" />
				<h1 className="lg:hidden block text-center text-3xl text-white font-bold" style={{textShadow: '5px 5px 10px rgba(0, 0, 0, .5)'}}>Login</h1>
				<hr className="border-accent-primary lg:block hidden border-[1.5px] mt-8 mb-5" />

				<CInput name="username" placeholder="Nomor NIS" className="lg:w-[30vw] w-[80vw] max" />
				<CInput name="password" placeholder="Password" type="password" className="lg:w-[30vw] w-[80vw] mb-10" />

				<div className="flex items-center justify-between">
					<div className="">
						<span>Belum punya password?</span>
						<CButton onClick={() => triggerPopup()} className="mt-4" type="button">Ambil Password</CButton>
					</div>
					<CButton type="submit" isLoading={loading} className="self-end px-10">Login</CButton>
				</div>
			</Form>

			{/*//? TITLE */}
			<div className="lg:order-last order-first lg:text-right text-center lg:mb-0 mb-10">
				<h1 className="3xl:text-8xl 2xl:text-7xl xl:text-6xl lg:max-w-[50vw] lg:text-5xl md:text-4xl text-3xl mb-4 font-bold text-white" style={{textShadow: '5px 5px 10px rgba(0, 0, 0, .8)'}}>Selamat Datang di <br className="lg:hidden" /> Web Pilkosis 2024</h1>
				<h2 className="xl:text-3xl lg:text-2xl md:text-xl text-lg font-bold text-white" style={{textShadow: '5px 5px 10px rgba(0, 0, 0, .8)'}}>SMK Negeri 1 Kebumen</h2>
			</div>

			{/*//? DECORATIONS */}
			<img src={decorations} className="absolute bottom-0 left-0 pointer-events-none" />
			<img src={decorations} className="absolute top-0 -left-10 lg:block hidden -rotate-90 scale-[-1] pointer-events-none" />

			<Link to="/umpan-balik" className="gap-4 absolute bottom-16 w-auto h-14 rounded-full flex justify-center items-center">
				<div className="rounded-full bg-secondary shadow-md flex justify-center items-center p-3">
					<IChat width="30" height="30" color="white" />
				</div>
				<p>Feedback</p>
			</Link>

			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
				transition={Bounce}
			/>
		</div>
	);
}
