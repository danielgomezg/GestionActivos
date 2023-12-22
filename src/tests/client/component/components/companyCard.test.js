import { beforeAll, describe, expect } from "vitest";
import { fireEvent, waitFor } from "@testing-library/svelte";
import CompanyCardWrapper from "../wrappers/companyCardWrapper.svelte";
import CompanyCard from "../../../../components/company/companyCard.svelte";

describe('CompanyCard', () => {
    let props;

    beforeAll(() => {
        props = {
            company: {
                name: 'Acme',
                rut: '1.111.111-1',
                country: 'Chile',
                count_sucursal: 5
            }
        }
    });

    it('should render companyCard', () => {
        const { container } = render(CompanyCard, { props });
        const name = container.querySelector('.card-title');
        console.log('NAME: ', name.innerHTML)
        const title = screen.queryByText('Acme')
        console.log('TITLE: ', title)
        expect(title).toBeInTheDocument();
    })

    it('should execute edit dispatch', async () => {
        const { component } = render(CompanyCard, { props });
        // const { component } = render(CompanyCardWrapper, {});
        // expect(component).toBeInTheDocument();

        // const iconButton = screen.queryByText('edit');

        // (await fireEvent.)
        // await waitFor(() => {
        //     const modalTitle = screen.modalTitle;
        //     expect(modalTitle).toHaveTextContent("Acme - editando")
        // })

    })

})