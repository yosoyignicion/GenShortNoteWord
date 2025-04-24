// Password Generator
document.getElementById('generate-password').addEventListener('click', () => {
    const length = document.getElementById('length').value;
    const uppercase = document.getElementById('uppercase').checked;
    const lowercase = document.getElementById('lowercase').checked;
    const numbers = document.getElementById('numbers').checked;
    const symbols = document.getElementById('symbols').checked;
  
    const charset = [
      uppercase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '',
      lowercase ? 'abcdefghijklmnopqrstuvwxyz' : '',
      numbers ? '0123456789' : '',
      symbols ? '!@#$%^&*()_+~`|}{[]:;?><,./-=' : ''
    ].join('');
  
    if (!charset) {
      alert('Selecciona al menos un tipo de carácter.');
      return;
    }
  
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
  
    const output = document.getElementById('password-output');
    output.textContent = password;
  
    // Copiar al portapapeles
    navigator.clipboard.writeText(password).then(() => {
      const feedback = document.getElementById('feedback');
      feedback.classList.remove('hidden');
      setTimeout(() => feedback.classList.add('hidden'), 2000);
    });
  });
  
  // URL Shortener
  document.getElementById('shorten-url').addEventListener('click', async () => {
    const url = document.getElementById('url-input').value;
  
    if (!url) {
      alert('Por favor, ingresa una URL válida.');
      return;
    }
  
    try {
      const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(url)}`);
      const data = await response.json();
  
      if (data.ok) {
        document.getElementById('shortened-url').textContent = `URL Acortada: ${data.result.short_link}`;
      } else {
        alert('Error al acortar la URL. Por favor, intenta nuevamente.');
      }
    } catch (error) {
      alert('Ocurrió un error al conectarse al servicio. Inténtalo más tarde.');
    }
  });
  
  // Bloc de Notas
  const noteText = document.getElementById('note-text');
  const saveNoteButton = document.getElementById('save-note');
  const exportNoteButton = document.getElementById('export-note');
  const noteFeedback = document.getElementById('note-feedback');
  
  // Cargar nota guardada
  window.addEventListener('load', () => {
    const savedNote = localStorage.getItem('savedNote');
    if (savedNote) {
      noteText.value = savedNote;
    }
  });
  
  // Guardar nota
  saveNoteButton.addEventListener('click', () => {
    const noteContent = noteText.value;
    if (noteContent.trim()) {
      localStorage.setItem('savedNote', noteContent);
      noteFeedback.classList.remove('hidden');
      setTimeout(() => noteFeedback.classList.add('hidden'), 2000);
    } else {
      alert('La nota está vacía. No se puede guardar.');
    }
  });
  
  // Exportar nota como .txt
  exportNoteButton.addEventListener('click', () => {
    const noteContent = noteText.value;
    if (noteContent.trim()) {
      const blob = new Blob([noteContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'nota.txt';
      a.click();
      URL.revokeObjectURL(url);
    } else {
      alert('La nota está vacía. No se puede exportar.');
    }
  });