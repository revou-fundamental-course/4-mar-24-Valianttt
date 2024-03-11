    document.addEventListener('DOMContentLoaded', function () {

        var calculateButton = document.getElementById('calculate-button');
        var weightInput = document.querySelector('input[name="weight"]');
        var heightInput = document.querySelector('input[name="height"]');
        var ageInput = document.querySelector('input[name="age"]');
        var resultContainer = document.querySelector('.container-result h1');
        var resultText = document.querySelector('.container-result h4');
        var resetButton = document.getElementById('reset-button');
        var resultSection = document.querySelector('.result');
        var resultSuggestion = document.querySelector('.suggestion');
    
        calculateButton.addEventListener('click', function () {

            var weight = parseFloat(weightInput.value);
            var height = parseFloat(heightInput.value);
            var age = parseFloat(ageInput.value);

            var genderRadios = document.querySelectorAll('input[name="gender"]');
            var selectedGender = Array.from(genderRadios).find(radio => radio.checked);

            if (isNaN(weight) || isNaN(height) || isNaN(age) || !selectedGender)  {
                alert("Mohon isi data , termasuk jenis kelamin");
                return;
            }

            if (weight > 300 ||height > 400 || age > 110){
                alert("MOHON ISI DATA DENGAN BENAR !!!")
                return;
            }


            var bmi = calculateBMI(weight, height);

            calculateButton.disabled = true;


            resultContainer.textContent = bmi;
            resultText.textContent = '';

            resultSection.textContent += 'Hasil dari BMI anda adalah: ' + bmi + '. Anda berada dalam kategori ';
            

            displayBMICategory(bmi);
            displayDiseaseDiagnosis(bmi);
        });


        function calculateBMI(weight, height) {

            var heightInMeter = height / 100;

            var bmi = weight / (heightInMeter * heightInMeter);

            return bmi.toFixed(2);
        }


        function displayBMICategory(bmi) {
            if (bmi < 18.5) {
                resultText.textContent = 'Kekurangan berat badan';
                resultSection.textContent += '(Kekurangan berat badan).';
                resultSuggestion.textContent +=  'Sebaiknya Anda mempertimbangkan untuk menambah asupan makanan untuk mencapai berat badan yang sehat';
            } else if (bmi >= 18.5 && bmi < 25) {
                resultText.textContent = 'Normal (ideal)';
                resultSection.textContent += '(Normal (ideal)).';
                resultSuggestion.textContent += 'Tetap jaga pola makan dan gaya hidup sehat.';
            } else if (bmi >= 25 && bmi < 30) {
                resultText.textContent = 'Kelebihan berat badan';
                resultSection.textContent += '(Kelebihan berat badan).';
                resultSuggestion.textContent += 'Kelebihan berat badan. Sebaiknya Anda mempertimbangkan untuk mengurangi asupan kalori dan meningkatkan aktivitas fisik.';
            } else {
                resultText.textContent = 'Kegemukan';
                resultSection.textContent += '(Kegemukan).';
                resultSuggestion.textContent += 'Penting untuk mengurangi asupan kalori dan meningkatkan aktivitas fisik untuk menjaga kesehatan.';
            }
        }

        function displayDiseaseDiagnosis(bmi) {
            var diagnosisSection = document.querySelector('.disease');
            var diseaseList = diagnosisSection.nextElementSibling;

            if (diseaseList && diseaseList.tagName === 'UL') {
                diseaseList.remove();
            }

            diseaseList = document.createElement('ul');
            diagnosisSection.parentNode.appendChild(diseaseList);  

            switch (true) {
                case (bmi < 18.5):
                    diagnosisSection.textContent = 'Beberapa penyakit yang berasal dari kekurangan berat badan';
                    diseaseList.innerHTML = 'Penurunan imunitas tubuh<br>Gangguan reproduksi<br>Kerusakan jaringan dan otot';
                    break;

                case (bmi >= 18.5 && bmi < 25):
                    diagnosisSection.textContent = 'Berat badan anda optimal 😁';
                    diseaseList.innerHTML = '<br>Pola makan sehat membantu mencegah penyakit kronis<br>Energi dan stamina yang baik';
                    break;
                case (bmi >= 25 && bmi < 30):
                    diagnosisSection.textContent = 'Beberapa penyakit yang berasal dari kelebihan berat badan';
                    diseaseList.innerHTML = '<br>Diabetes tipe 2<br>Penyakit jantung<br>Apnea tidur (gangguan tidur)';
                    break;
        
                default:
                    diagnosisSection.textContent = 'Beberapa penyakit yang berasal dari kegemukan';
                    diseaseList.innerHTML = '<br>Hipertensi (tekanan darah tinggi)<br>Kolesterol tinggi<br>Arthritis (radang sendi)';
                    break;
            }
            diagnosisSection.parentNode.appendChild(diseaseList);
        
        }


        resetButton.addEventListener('click', function(){

            calculateButton.disabled = false;

            weightInput.value = '';
            heightInput.value = '';
            ageInput.value = '';
            resultContainer.value = '';
            resultText.value = '';

            resultContainer.textContent = '0';
            resultText.textContent = 'Hasil berat anda';
            
            resultSection.textContent ='';
            resultSuggestion.textContent ='';

            

            var genderRadios = document.querySelectorAll('input[name="gender"]');
            genderRadios.forEach(radio => radio.checked = false);
            
            var diseaseList = document.querySelector('.disease + ul');
            if (diseaseList){
                diseaseList.innerHTML = '';
            }

            var diagnosisSection = document.querySelector('.disease');
            diagnosisSection.textContent = '';

        });
        
    });
