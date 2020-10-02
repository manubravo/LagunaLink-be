import {Nullable} from '../../../../Shared/domain/Nullable';
import {MongoRepository} from '../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import {JobOpening} from '../../domain/JobOpening';
import {JobOpeningRepository} from "../../domain/JobOpeningRepository";
import {JobOpeningId} from "../../../Shared/domain/JobOpenings/JobOpeningId";

export class MongoJobOpeningRepository extends MongoRepository<JobOpening> implements JobOpeningRepository {
    public save(jobOpening: JobOpening): Promise<void> {
        return this.persist(
            jobOpening.id.value, jobOpening);
    }

    public async search(id: JobOpeningId): Promise<Nullable<JobOpening>> {
        const collection = await this.collection();

        const document = await collection.findOne({_id: id.value});

        return document ? JobOpening.fromPrimitives({...document, id: id.value}) : null;
    }

    protected moduleName(): string {
        return 'jobOpenings';
    }
}