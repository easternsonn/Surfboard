const btn_names = document.querySelectorAll('.member__name');

btn_names.forEach(item => {

    item.addEventListener('click', function (Event) {
        const parentEl = event.target.parentElement.parentElement;
        const memberDescription = parentEl.querySelector('.member__description');
        const triangle = parentEl.querySelector('.member__name-triangle');

        if (triangle.classList.contains('member__name-triangle_rotated')) {
            triangle.classList.remove('member__name-triangle_rotated');
        } else {
            triangle.classList.add('member__name-triangle_rotated');
        }

        if (memberDescription.classList.contains('member__description_visible')) {
            memberDescription.classList.remove('member__description_visible');
        } else {
            memberDescription.classList.add('member__description_visible');
        }

    })

})