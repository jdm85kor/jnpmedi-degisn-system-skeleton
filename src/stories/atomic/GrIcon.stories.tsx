import { ComponentStory } from "@storybook/react";
import { GrButton } from "../../components/atomic/GrButton";
import { GrIcon } from "../../components/atomic/GrIcon";

export default {
  title: "Atomic Components/GrIcon",
  component: GrIcon,
};

const Template: ComponentStory<typeof GrIcon> = (args) => <GrIcon {...args} />;

/** Spec */
export const Spec = Template.bind({});
Spec.args = {
  name: "eraser",
};
Spec.decorators = [
  (Story) => (
    <div style={{ backgroundColor: "#ccc", padding: "1rem" }}>
      <Story />
    </div>
  ),
];

/** Story 1 : 버튼과 함께 써보기 */
export const With_Button = Template.bind({});
With_Button.storyName = "버튼과 같이 사용하기";
With_Button.decorators = [
  () => (
    <div>
      <GrButton color="primary">
        <GrIcon name="align-left" color="yellow" />
        좌측 정렬
      </GrButton>

      <GrButton color="primary">
        <GrIcon name="align-justify" color="yellow" />
        좌우로 정렬
      </GrButton>

      <GrButton color="primary">
        <GrIcon name="align-right" color="yellow" />
        우측 정렬
      </GrButton>
    </div>
  ),
];

/** Story 2 */
export const Sizing = Template.bind({});
Sizing.storyName = "사이즈 조절하기";
Sizing.decorators = [
  () => (
    <div>
      <h1>안됩니다!</h1>
      <div>
        <GrIcon name="align-left" color="black" />
      </div>
    </div>
  ),
];

/** Story 3 */
export const Trans = Template.bind({});
Trans.storyName = "회전 트랜스폼";
Trans.decorators = [
  () => (
    <div style={{ backgroundColor: "#ccc" }}>
      <GrIcon
        name="align-left"
        color="black"
        rotation={15}
        rotationOnHover={180}
      />
    </div>
  ),
];
