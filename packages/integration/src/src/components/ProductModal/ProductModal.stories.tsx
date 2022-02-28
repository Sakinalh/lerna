import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Button, Grid } from "@mui/material";
import { FiltersProductNav } from "src/PageGeneration/components/FiltersProductNav/FiltersProductNav.component";
import { CardImg } from "src/PageGeneration/components/CardImg/CardImg.component";
import { AppPagination } from "../AppPagination/AppPagination.component";
import { ProductModal, ProductModalProps } from "./ProductModal.component";
import { AppBtn } from "../AppBtn/AppBtn.component";
import { AppCheckbox } from "../AppCheckbox/AppCheckbox.component";

export default {
  title: "Ui/ProductModal",
  component: ProductModal,
  argTypes: {}
} as Meta;

const Template: Story<ProductModalProps> = args => <ProductModal {...args} />;

export const Full = Template.bind({});
Full.args = {
  type: "full",
  title: "Add Product",
  footer: (
    <Grid justifyContent="space-between" alignItems="center" container>
      <Grid className="container__footer--txt" item>
        Showing 10 of 130 products
      </Grid>
      <Grid item>
        <AppPagination pageNumber={5} />
      </Grid>
      <Grid item className="container__right">
        <Grid
          className="container__right--elem"
          container
          justifyContent="space-between"
          alignItems="center"
        >
          <span className="container__footer--txt">4 products selected</span>
          <div className="container__btns">
            <AppBtn typeBtn="customSimple" noPadding>
              Cancel
            </AppBtn>
            <AppBtn typeBtn="customPrimary" noPadding>
              Apply
            </AppBtn>
          </div>
        </Grid>
      </Grid>
    </Grid>
  ),
  children: (
    <>
      <div className="container__filters">
        <FiltersProductNav
          filters={[
            {
              type: "title",
              query: "contains",
              keyword: "disney"
            }
          ]}
        />
      </div>
      <div className="container__products">
        <Grid
          className="container__gridProduct container__gridProduct--5"
          spacing={2}
          container
          justifyContent="flex-start"
          alignItems="center"
        >
          {Array(10)
            .fill("")
            .map(() => (
              <Grid item>
                <CardImg
                    isSelected={true}
                    header={true}
                    content={true}
                    footer={true}
                    tag={true}
                    pct={99}
                    src="https://via.placeholder.com/250x142"
                    actions={
                      <Grid
                        container
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Grid item>
                          <AppCheckbox
                            onChange={() => {}}
                            whiteBg
                            color="primary"
                            disableRipple={true}
                          />
                        </Grid>
                      </Grid>
                    }
                    children={
                      <>
                        <h4 className="cardImg__title">
                          Le Château de la Belle au Bois Dormant
                        </h4>
                        <p className="cardImg__description">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Maecenas orci dui…
                        </p>
                        <p className="cardImg__price">€89</p>
                      </>
                    }
                  />
              </Grid>
            ))}
        </Grid>
      </div>
    </>
  )
};

export const withSidebar = Template.bind({});
withSidebar.args = {
  type: "withSidebar",
  title: "Replace Product",
  footer: (
    <Grid justifyContent="space-between" alignItems="center" container>
      <Grid className="container__footer--txt" item>
        Showing 10 of 130 products
      </Grid>
      <Grid item>
        <AppPagination pageNumber={5} />
      </Grid>
      <Grid item className="container__right">
        <Grid
          className="container__right--elem"
          container
          justifyContent="space-between"
          alignItems="center"
        >
          <span className="container__footer--txt">4 products selected</span>
          <div className="container__btns">
            <AppBtn typeBtn="customSimple" noPadding>
              Cancel
            </AppBtn>
            <AppBtn typeBtn="customPrimary" noPadding>
              Apply
            </AppBtn>
          </div>
        </Grid>
      </Grid>
    </Grid>
  ),
  children: (
    <>
      <div className="container__filters">
        <FiltersProductNav
          filters={[
            {
              type: "title",
              query: "contains",
              keyword: "disney"
            }
          ]}
        />
      </div>
      <div className="container__products">
        <Grid
          className="container__gridProduct container__gridProduct--4"
          spacing={2}
          container
          justifyContent="flex-start"
          alignItems="center"
        >
          {Array(10)
            .fill("")
            .map(() => (
              <Grid item>
                <CardImg
                    isSelected={true}
                    header={true}
                    content={true}
                    footer={true}
                    tag={true}
                    pct={99}
                    src="https://via.placeholder.com/250x142"
                    actions={
                      <Grid
                        container
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Grid item>
                          <AppCheckbox
                            onChange={() => {}}
                            whiteBg
                            color="primary"
                            disableRipple={true}
                          />
                        </Grid>
                      </Grid>
                    }
                    children={
                      <>
                        <h4 className="cardImg__title">
                          Le Château de la Belle au Bois Dormant
                        </h4>
                        <p className="cardImg__description">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Maecenas orci dui…
                        </p>
                        <p className="cardImg__price">€89</p>
                      </>
                    }
                  />
              </Grid>
            ))}
        </Grid>
      </div>
    </>
  ),
  aside: (
    <>
      <p className="container__description">From</p>

      <CardImg
        isSelected={false}
        header={true}
        content={true}
        footer={false}
        tag={true}
        pct={99}
        src="https://via.placeholder.com/250x142"
        actions={
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <AppCheckbox whiteBg color="primary" disableRipple={true} />
            </Grid>
          </Grid>
        }
        children={
          <>
            <h4 className="cardImg__title">
              Le Château de la Belle au Bois Dormant
            </h4>
            <p className="cardImg__description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              orci dui…
            </p>
            <p className="cardImg__price">€89</p>
          </>
        }
      />
    </>
  )
};
