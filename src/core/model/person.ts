import { StaticStructureElement } from "./staticStructureElement";
import { IEquatable } from "./iequatable";
import { Location } from "./location";
import { Tags } from "./tags";
import { Element } from "./element";
import { InteractionStyle } from "./interactionStyle";
import { Relationship } from "./relationship";

export class Person extends StaticStructureElement implements IEquatable<Person> {

    public static type = "Person";
    public get type(): string { return Person.type; }

    public location = Location.Unspecified;

    public get canonicalName(): string {
        return Element.CanonicalNameSeparator + super.formatForCanonicalName(this.name);
    }

    public get parent(): Element | null { return null; }
    public set parent(p: Element | null) { }

    public getRequiredTags() {
        return [Tags.Element, Tags.Person];
    }

    public interactsWith(destination: Person, description: string, technology?: string, interactionStyle: InteractionStyle = InteractionStyle.Synchronous, ...tags: string[]): Relationship | null {
        return this.model.addRelationship(this, destination, description, technology, interactionStyle, tags);
    }

    public toDto() {
        var dto = super.toDto();
        dto.location = this.location;
        return dto;
    }

    public fromDto(dto: any) {
        super.fromDto(dto);
        this.location = dto.location;
    }
}
