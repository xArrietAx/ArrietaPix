export const usernames = /^(?!.*\.\.)(?!.*\.$)[a-zA-Z0-9ÁÉÍÓÚÜáéíóúüñÑ_.-]{3,16}$/;

export const emails = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/

export const passwords = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+~`|}{[}\]:;?/.,<>=-]).{8,}$/

export const verifyKey = /^[A-Za-z0-9-_]*$/

export const albumsName = /^(?!.*\s$)[a-zA-Z0-9ÁÉÍÓÚÜáéíóúüñÑ\s]{2,20}$/